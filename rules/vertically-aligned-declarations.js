const getStateVariableDeclarationBlocks = require('./utils/getStateVariableDeclarationBlocks');
const goodCode = `
contract C {
    uint256 public a;
    uint256 public b;
};
`;
const badCode = `
contract C {
    uint256 public a;
    uint public b;
};
`;

const lineBreakPattern = /\r\n|[\r\n\u2028\u2029]/u;

const meta = {
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
        const maxAlignment = Math.max(...alignments);
        alignments.forEach((alignment, idx) => {
            if (alignment !== maxAlignment) {
                errors.push({ ...ctx, loc: block[idx].loc });
            }
        });
    }
    return errors;
}
class VerticallyAlignedDeclarations {
    constructor(reporter, config, inputSrc, fileName) {
        this.ruleId = 'vertically-aligned-declarations';
        this.reporter = reporter;
        this.config = config;
        this.inputSrc = inputSrc;
        this.fileName = fileName;
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

module.exports = { VerticallyAlignedDeclarations };
