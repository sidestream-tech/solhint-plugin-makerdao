import getStateVariableDeclarationBlocks from './utils/getStateVariableDeclarationBlocks';
import getMaxArrayValueOrNull from './utils/getMaxArrayValueOrNull';
import type { Reporter, RuleMeta } from 'solhint';

const goodCode = `
pragma solidity 0.4.4;


contract C {
    uint256 public a = 33;
    uint256 public b = 1337;
}
`;
const badCode = `
pragma solidity 0.4.4;


contract C {
    uint256 public a = 12;
    uint    public b =  12;
}
`;

export const meta: RuleMeta = {
    ruleId: 'vertically-aligned-assignments',
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

function validateVerticalInitialValueAlignments(stateVariableDeclarationBlocks: any, ctx: any) {
    const errors: any[] = [];
    for (const block of stateVariableDeclarationBlocks) {
        const alignments = block.map((node: any) => node.variables[0].expression.loc.start.column);
        const maxAlignment = getMaxArrayValueOrNull(alignments);
        if (maxAlignment === null) {
            return [];
        }
        alignments.forEach((alignment: any, idx: any) => {
            if (alignment !== maxAlignment) {
                errors.push({ ...ctx, loc: block[idx].loc });
            }
        });
    }
    return errors;
}
export class VerticallyAlignedAssignments {
    private ruleId: string;

    private reporter: Reporter;

    private meta: RuleMeta;

    constructor(reporter: Reporter) {
        this.ruleId = meta.ruleId;
        this.reporter = reporter;
        this.meta = meta;
    }

    ContractDefinition(ctx: any) {
        const stateVariableDeclarationBlocks = getStateVariableDeclarationBlocks(ctx);
        const errors = validateVerticalInitialValueAlignments(stateVariableDeclarationBlocks, ctx);
        errors.forEach(error =>
            this.reporter.error(error, this.ruleId, 'State variable assignments should be aligned')
        );
    }
}

export default { VerticallyAlignedAssignments, meta };
