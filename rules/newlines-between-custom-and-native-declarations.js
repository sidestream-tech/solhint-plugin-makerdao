const getStateVariableDeclarationBlocks = require('./utils/getStateVariableDeclarationBlocks');
const goodCode = `
contract C {
    uint256 public a;
    uint256 public b;

    MyInterface public interface;
};
`;
const badCode = `
contract C {
    uint256 public a;
    uint public b;
    MyInterface public interface;
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
                    description: 'Newline between custom interface and native type',
                    code: goodCode,
                },
            ],
            bad: [
                {
                    description: 'No newline between custom interface and native type',
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
        for (let i = 1; i < block.length; i++) {
            const currentVariable = block[i].variables[0];
            const previousVariable = block[i - 1].variables[0];
            if (currentVariable.typeName.type === previousVariable.typeName.type) {
                continue;
            }

            errors.push({ ...block[i] });
        }
    }
    return errors;
}
class NewlinesBetweenCustomAndNativeDeclarations {
    constructor(reporter) {
        this.ruleId = 'newlines-between-custom-and-native-declarations';
        this.reporter = reporter;
        this.meta = meta;
    }
    ContractDefinition(ctx) {
        const stateVariableDeclarationBlocks = getStateVariableDeclarationBlocks(ctx);
        const errors = validateVerticalDeclarationAlignments(stateVariableDeclarationBlocks, ctx);
        errors.forEach(error =>
            this.reporter.error(error, this.ruleId, 'Should have newlines between custom and native declarations')
        );
    }
}

module.exports = { NewlinesBetweenCustomAndNativeDeclarations };
