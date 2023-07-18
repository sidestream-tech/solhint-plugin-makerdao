import type {
    Reporter,
    RuleMeta,
    ContractDefinition,
    BaseASTNode,
    StateVariableDeclaration,
    FunctionDefinition,
    VariableDeclaration,
} from 'solhint';
import getStateVariableDeclarationBlocks from './utils/getStateVariableDeclarationBlocks';
import getMaxArrayValueOrNull from './utils/getMaxArrayValueOrNull';

type VisibilityModifier = VariableDeclaration['visibility'];
type Locations = ({
    visibilityModifier: VisibilityModifier;
    lines: number[];
} | null)[];

const goodCode = `
pragma solidity 0.4.4;


contract C {
    uint256 public a;
    uint    public b;
}
`;
const badCode = `
pragma solidity 0.4.4;


contract C {
    uint256 public a;
    uint public    b;
}
`;

const lineBreakPattern = /\r\n|[\r\n\u2028\u2029]/u;

export const meta: RuleMeta = {
    ruleId: 'vertically-aligned-state-var-visibility',
    type: 'miscellaneous',

    docs: {
        description:
            'Check that declarations of contract variables have their visibility modifiers aligned vertically.',
        category: 'Miscellaneous',
        examples: {
            good: [
                {
                    description: 'All visibility modifiers start on the same column',
                    code: goodCode,
                },
            ],
            bad: [
                {
                    description: 'Not all visibility modifiers start on the same column',
                    code: badCode,
                },
            ],
        },
    },

    isDefault: false,
    recommended: false,
    defaultSetup: 'warn',

    schema: null,
};

function getVariableVisibilityModifierLocations(stateVariableDeclarationBlock: StateVariableDeclaration[]) {
    const typeNameEndLocations = stateVariableDeclarationBlock
        .map(node => {
            if (
                node.variables[0].typeName?.loc?.end.line === undefined ||
                node.variables[0].identifier?.loc?.start.line === undefined
            ) {
                return undefined;
            }
            return {
                lines: [node.variables[0].typeName?.loc?.end.line, node.variables[0].identifier?.loc?.start.line],
                visibilityModifier: node.variables[0].visibility,
            };
        })
        .filter((value): value is { lines: number[]; visibilityModifier: VisibilityModifier } => value !== undefined);
    const visibilityModifierLocations = typeNameEndLocations.map(loc => {
        const { lines, visibilityModifier } = loc;
        if (visibilityModifier === 'default') {
            return null;
        }
        return { visibilityModifier, lines };
    });
    return visibilityModifierLocations;
}

function getIndexOfVisibilityModifier(line: string, visibilityModifier: VisibilityModifier) {
    if (visibilityModifier === undefined) {
        return null;
    }
    // eslint-disable-next-line no-useless-escape
    const re = new RegExp(`($|(\s)*)${visibilityModifier}($|(\s)*)`, 'g');
    const match = re.exec(line);
    if (match) {
        return match.index + match[0].indexOf(visibilityModifier);
    }
    return null;
}

function getVariableVisibilityModifierColumnsPerBlock(visibilityModifierLocations: Locations, inputSrc: string) {
    const mapped = visibilityModifierLocations.map(modifier => {
        if (modifier === null) {
            return null;
        }
        const { visibilityModifier, lines } = modifier;
        const [startLine, endLine] = lines;
        const linesOfCode = inputSrc.split(lineBreakPattern).slice(startLine - 1, endLine);
        const columnLocationsOfModifier = linesOfCode.map(line =>
            getIndexOfVisibilityModifier(line, visibilityModifier)
        );

        return columnLocationsOfModifier.find((column: number | null) => column !== null) || null;
    });
    return mapped.filter<number>((value): value is number => value !== null);
}

function validateVerticalVisibilityAlignments(
    stateVariableDeclarationBlocks: StateVariableDeclaration[][],
    ctx: ContractDefinition,
    inputSrc: string
) {
    const errors: BaseASTNode[] = [];
    for (const block of stateVariableDeclarationBlocks) {
        const locations: Locations = getVariableVisibilityModifierLocations(block);
        const columns = getVariableVisibilityModifierColumnsPerBlock(locations, inputSrc);
        const maxAlignment = getMaxArrayValueOrNull(columns);
        if (maxAlignment === null) {
            return [];
        }
        columns.forEach((col, idx) => {
            if (col !== maxAlignment) {
                errors.push({ ...ctx, loc: block[idx].loc });
            }
        });
    }
    return errors;
}
export class VerticallyAlignedVisibilityModifiers {
    private ruleId: string;

    private reporter: Reporter;

    private inputSrc: string;

    private meta: RuleMeta;

    constructor(reporter: Reporter, _config: any, inputSrc: string) {
        this.ruleId = meta.ruleId;
        this.reporter = reporter;
        this.inputSrc = inputSrc;
        this.meta = meta;
    }

    ContractDefinition(ctx: ContractDefinition) {
        const stateVariableDeclarationBlocks = getStateVariableDeclarationBlocks(ctx);
        const errors = validateVerticalVisibilityAlignments(stateVariableDeclarationBlocks, ctx, this.inputSrc);
        errors.forEach(error =>
            this.reporter.error(error, this.ruleId, 'State variable visibility modifiers should be aligned')
        );
    }
}

export default { VerticallyAlignedVisibilityModifiers, meta };
