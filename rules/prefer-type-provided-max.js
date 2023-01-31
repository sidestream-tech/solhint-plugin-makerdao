const goodCode = `
contract C {
    uint256 a = type(uint256).max;
};
`;
const badCode = `
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
    }
    FunctionCall(ctx) {
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
