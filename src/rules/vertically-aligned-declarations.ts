import type { BaseASTNode, ContractDefinition, Reporter, RuleMeta, StateVariableDeclaration } from 'solhint';
import getStateVariableDeclarationBlocks from './utils/getStateVariableDeclarationBlocks';
import getMaxArrayValueOrNull from './utils/getMaxArrayValueOrNull';

const goodCode = `
pragma solidity 0.4.4;


contract C {
    uint256 public a;
    uint256 public b;
}
`;
const badCode = `
pragma solidity 0.4.4;


contract C {
    uint256 public a;
    uint public b;
}
`;

export const meta: RuleMeta = {
    ruleId: 'vertically-aligned-declarations',
    type: 'miscellaneous',

    docs: {
        description: 'Check that declarations of contract variables have their names aligned vertically.',
        category: 'Miscellaneous',
        examples: {
            good: [
                {
                    description: 'All names start on the same column',
                    code: goodCode,
                },
            ],
            bad: [
                {
                    description: 'Not all names start on the same column',
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

function validateVerticalDeclarationAlignments(
    stateVariableDeclarationBlocks: StateVariableDeclaration[][],
    ctx: ContractDefinition
) {
    const errors: BaseASTNode[] = [];
    for (const block of stateVariableDeclarationBlocks) {
        const alignments = block
            .map(node => node.variables[0].identifier?.loc?.start.column)
            .filter((item): item is number => !!item);
        const maxAlignment = getMaxArrayValueOrNull(alignments);
        if (maxAlignment === null) {
            return [];
        }
        alignments.forEach((alignment, idx) => {
            if (alignment !== maxAlignment) {
                errors.push({ ...ctx, loc: block[idx].loc });
            }
        });
    }
    return errors;
}
export class VerticallyAlignedDeclarations {
    private ruleId: string;

    private reporter: Reporter;

    private meta: RuleMeta;

    constructor(reporter: Reporter) {
        this.ruleId = meta.ruleId;
        this.reporter = reporter;
        this.meta = meta;
    }

    ContractDefinition(ctx: ContractDefinition) {
        const stateVariableDeclarationBlocks = getStateVariableDeclarationBlocks(ctx);
        const errors = validateVerticalDeclarationAlignments(stateVariableDeclarationBlocks, ctx);
        errors.forEach(error =>
            this.reporter.error(error, this.ruleId, 'State variable declarations should be aligned')
        );
    }
}

export default { VerticallyAlignedDeclarations, meta };
