const getStateVariableDeclarationBlocks = require('./utils/getStateVariableDeclarationBlocks');

const goodCode = `
contract C {
    uint256 constant SNEK_CASE = 33;
};
`;
const badCode = `
contract C {
    uint256 SNEK_CASE = 33;
};
`;

const lineBreakPattern = /\r\n|[\r\n\u2028\u2029]/u;

const meta = {
    type: 'miscellaneous',

    docs: {
        description: 'Check that only constant variable names are in all caps and snake case',
        category: 'Miscellaneous',
        examples: {
            good: [
                {
                    description: 'variable is in snake case and is constant',
                    code: goodCode,
                },
            ],
            bad: [
                {
                    description: 'variable is in snake case and is not constant',
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

function isCapitalSnake(name) {
    const capitalSnakePattern = /^[A-Z0-9_]+$/u;
    return capitalSnakePattern.test(name);
}

class CapitalizedSnakeOnlyForConst {
    constructor(reporter, config, inputSrc, fileName) {
        this.ruleId = 'capitalized-snake-only-for-const';
        this.reporter = reporter;
        this.config = config;
        this.inputSrc = inputSrc;
        this.fileName = fileName;
        this.meta = meta;
    }
    VariableDeclaration(ctx) {
        if (ctx.isDeclaredConst) {
            return;
        }
        if (isCapitalSnake(ctx.name)) {
            this.reporter.error(ctx, this.ruleId, 'Variable name is in all caps and snake case, but is not constant');
        }
    }
}

module.exports = { CapitalizedSnakeOnlyForConst };
