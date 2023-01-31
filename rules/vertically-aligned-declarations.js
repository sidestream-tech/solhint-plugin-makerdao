const getStateVariableDeclarationBlocks = require('./utils/getStateVariableDeclarationBlocks');
const getMaxArrayValueOrNull = require('./utils/getMaxArrayValueOrNull');
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

const lineBreakPattern = /\r\n|[\r\n\u2028\u2029]/u;

const meta = {
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

function validateVerticalDeclarationAlignments(stateVariableDeclarationBlocks, ctx) {
    const errors = [];
    for (const block of stateVariableDeclarationBlocks) {
        const alignments = block.map(node => node.variables[0].identifier.loc.start.column);
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
class VerticallyAlignedDeclarations {
    constructor(reporter) {
        this.ruleId = meta.ruleId;
        this.reporter = reporter;
        this.meta = meta;
    }
    ContractDefinition(ctx) {
        const stateVariableDeclarationBlocks = getStateVariableDeclarationBlocks(ctx);
        const errors = validateVerticalDeclarationAlignments(stateVariableDeclarationBlocks, ctx);
        errors.forEach(error =>
            this.reporter.error(error, this.ruleId, 'State variable declarations should be aligned')
        );
    }
}

module.exports = { VerticallyAlignedDeclarations, meta };
