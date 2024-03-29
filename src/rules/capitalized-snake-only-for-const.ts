import type { Reporter, RuleMeta, VariableDeclaration } from 'solhint';

const goodCode = `
pragma solidity 0.4.4;


contract C {
    uint256 constant SNAKE_CASE = 33;
}
`;
const badCode = `
pragma solidity 0.4.4;


contract C {
    uint256 SNAKE_CASE = 33;
}
`;

export const meta: RuleMeta = {
    ruleId: 'capitalized-snake-only-for-const',
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

function isCapitalSnake(name: string) {
    const capitalSnakePattern = /^[A-Z0-9_]+$/u;
    return capitalSnakePattern.test(name);
}

export class CapitalizedSnakeOnlyForConst {
    private ruleId: string;

    private reporter: Reporter;

    private meta: RuleMeta;

    constructor(reporter: Reporter) {
        this.ruleId = meta.ruleId;
        this.reporter = reporter;
        this.meta = meta;
    }

    VariableDeclaration(ctx: VariableDeclaration) {
        if (ctx.isDeclaredConst) {
            return;
        }
        if (ctx.name && isCapitalSnake(ctx.name)) {
            this.reporter.error(ctx, this.ruleId, 'Variable name is in all caps and snake case, but is not constant');
        }
    }
}

export default { rule: CapitalizedSnakeOnlyForConst, meta };
