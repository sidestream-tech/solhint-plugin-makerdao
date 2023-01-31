const semver = require('semver');

const goodCode = `
pragma solidity ^0.7.0;
contract C {
    uint256 a = type(uint256).max;
};
`;
const badCode = `
pragma solidity ^0.7.0;
contract C {
    uint256 a = uint256(-1);
};
`;
const meta = {
    type: 'miscellaneous',

    docs: {
        description: 'Check that the max value is extracted from type information instead of conversion',
        category: 'Miscellaneous',
        examples: {
            good: [
                {
                    description: '`type(uint256).max` is used',
                    code: goodCode,
                },
            ],
            bad: [
                {
                    description: '`uint256(-1)` is used',
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

class PreferTypeProvidedMax {
    constructor(reporter) {
        this.ruleId = 'prefer-type-provided-max';
        this.reporter = reporter;
        this.meta = meta;
        this.ruleActiveAt = '0.7.0';
        this.ruleActive = false;
    }
    PragmaDirective(node) {
        if (node.name === 'solidity' && semver.satisfies(semver.minVersion(node.value), this.ruleActiveAt)) {
            this.ruleActive = true;
        }
    }
    FunctionCall(ctx) {
        if (!this.ruleActive) {
            return;
        }
        if (!ctx.expression || ctx.expression.type !== 'ElementaryTypeName') {
            return;
        }
        const typeName = ctx.expression.name;
        if (!typeName.startsWith('uint')) {
            return;
        }
        if (!ctx.arguments || ctx.arguments[0].operator !== '-' || ctx.arguments[0].subExpression.number !== '1') {
            return;
        }
        this.reporter.error(ctx, this.ruleId, `Use type(${typeName}).max instead of ${typeName}(-1)`, this.meta);
    }
}

module.exports = { PreferTypeProvidedMax };
