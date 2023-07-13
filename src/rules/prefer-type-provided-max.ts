const semver = require('semver');

const goodCode = `
pragma solidity ^0.7.0;


contract C {
    uint256 a = type(uint256).max;
}
`;
const badCode = `
pragma solidity ^0.7.0;


contract C {
    uint256 a = uint256(-1);
}
`;
export const meta = {
    ruleId: 'prefer-type-provided-max',
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

export class PreferTypeProvidedMax {
    private ruleId: string;
    private reporter: any;
    private meta: any;
    private ruleActiveAt: string;
    private ruleActive: boolean;
    constructor(reporter: any) {
        this.ruleId = meta.ruleId;
        this.reporter = reporter;
        this.meta = meta;
        this.ruleActiveAt = '0.7.0';
        this.ruleActive = false;
    }
    PragmaDirective(node: any) {
        if (node.name === 'solidity' && semver.satisfies(semver.minVersion(node.value), this.ruleActiveAt)) {
            this.ruleActive = true;
        }
    }
    FunctionCall(ctx: any) {
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

export default { PreferTypeProvidedMax, meta };
