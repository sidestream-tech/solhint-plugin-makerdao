import type { FunctionCall, PragmaDirective, Reporter, RuleMeta } from 'solhint';

import { satisfies, minVersion } from 'semver';

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
export const meta: RuleMeta = {
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

    private reporter: Reporter;

    private meta: RuleMeta;

    private ruleActiveAt: string;

    private ruleActive: boolean;

    constructor(reporter: Reporter) {
        this.ruleId = meta.ruleId;
        this.reporter = reporter;
        this.meta = meta;
        this.ruleActiveAt = '0.7.0';
        this.ruleActive = false;
    }

    PragmaDirective(node: PragmaDirective) {
        const minVer = minVersion(node.value);
        if (!minVer) {
            return;
        }
        if (node.name === 'solidity' && satisfies(minVer, this.ruleActiveAt)) {
            this.ruleActive = true;
        }
    }

    FunctionCall(ctx: FunctionCall) {
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
        if (ctx.arguments[0].type !== 'UnaryOperation') {
            return;
        }
        if (!ctx.arguments || ctx.arguments[0].operator !== '-' || ctx.arguments[0].subExpression.number !== '1') {
            return;
        }
        this.reporter.error(ctx, this.ruleId, `Use type(${typeName}).max instead of ${typeName}(-1)`, this.meta);
    }
}

export default { PreferTypeProvidedMax, meta };
