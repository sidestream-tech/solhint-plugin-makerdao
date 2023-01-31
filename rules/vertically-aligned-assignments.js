const getStateVariableDeclarationBlocks = require('./utils/getStateVariableDeclarationBlocks');

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

const lineBreakPattern = /\r\n|[\r\n\u2028\u2029]/u;

const meta = {
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

function validateVerticalInitialValueAlignments(stateVariableDeclarationBlocks, ctx) {
    const errors = [];
    for (const block of stateVariableDeclarationBlocks) {
        const alignments = block.map(node => node.variables[0].expression.loc.start.column);
        const maxAlignment = Math.max(...alignments);
        alignments.forEach((alignment, idx) => {
            if (alignment !== maxAlignment) {
                errors.push({ ...ctx, loc: block[idx].loc });
            }
        });
    }
    return errors;
}
class VerticallyAlignedAssignments {
    constructor(reporter) {
        this.ruleId = meta.ruleId;
        this.reporter = reporter;
        this.meta = meta;
    }
    ContractDefinition(ctx) {
        const stateVariableDeclarationBlocks = getStateVariableDeclarationBlocks(ctx);
        const errors = validateVerticalInitialValueAlignments(stateVariableDeclarationBlocks, ctx);
        errors.forEach(error =>
            this.reporter.error(error, this.ruleId, 'State variable assignments should be aligned')
        );
    }
}

module.exports = { VerticallyAlignedAssignments, meta };
