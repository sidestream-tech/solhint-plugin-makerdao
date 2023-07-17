import getStateVariableDeclarationBlocks from './utils/getStateVariableDeclarationBlocks';
import getMaxArrayValueOrNull from './utils/getMaxArrayValueOrNull';
import type { Reporter, RuleMeta } from 'solhint';

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

function getVariableVisibilityModifierLocations(stateVariableDeclarationBlock: any) {
    const typeNameEndLocations = stateVariableDeclarationBlock.map((node: any) => ({
        lines: [node.variables[0].typeName.loc.end.line, node.variables[0].identifier.loc.start.line],
        visibilityModifier: node.variables[0].visibility,
    }));
    const visibilityModifierLocations = typeNameEndLocations.map(
        ({ lines, visibilityModifier }: { lines: any; visibilityModifier: any }) => {
            if (visibilityModifier === 'default') {
                return null;
            }
            return { visibilityModifier, lines };
        }
    );
    return visibilityModifierLocations;
}

function getIndexOfVisibilityModifier(line: any, visibilityModifier: any) {
    // eslint-disable-next-line no-useless-escape
    const re = new RegExp(`($|(\s)*)${visibilityModifier}($|(\s)*)`, 'g');
    const match = re.exec(line);
    if (match) {
        return match.index + match[0].indexOf(visibilityModifier);
    }
    return null;
}

function getVariableVisibilityModifierColumnsPerBlock(visibilityModifierLocations: any[], inputSrc: string) {
    const ret = visibilityModifierLocations.map((modifier: any) => {
        if (modifier === null) {
            return null;
        }
        const { visibilityModifier, lines } = modifier;
        const [startLine, endLine] = lines;
        const linesOfCode = inputSrc.split(lineBreakPattern).slice(startLine - 1, endLine);
        const columnLocationsOfModifier = linesOfCode.map((line: any) =>
            getIndexOfVisibilityModifier(line, visibilityModifier)
        );

        return columnLocationsOfModifier.find((column: number | null) => column !== null);
    });
    return ret;
}

function validateVerticalVisibilityAlignments(stateVariableDeclarationBlocks: any, ctx: any, inputSrc: string) {
    const errors: any[] = [];
    for (const block of stateVariableDeclarationBlocks) {
        const locations = getVariableVisibilityModifierLocations(block);
        const columns = getVariableVisibilityModifierColumnsPerBlock(locations, inputSrc);
        const maxAlignment = getMaxArrayValueOrNull(columns);
        if (maxAlignment === null) {
            return [];
        }
        columns.forEach((col: any, idx: number) => {
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

    ContractDefinition(ctx: any) {
        const stateVariableDeclarationBlocks = getStateVariableDeclarationBlocks(ctx);
        const errors = validateVerticalVisibilityAlignments(stateVariableDeclarationBlocks, ctx, this.inputSrc);
        errors.forEach(error =>
            this.reporter.error(error, this.ruleId, 'State variable visibility modifiers should be aligned')
        );
    }
}

export default { VerticallyAlignedVisibilityModifiers, meta };
