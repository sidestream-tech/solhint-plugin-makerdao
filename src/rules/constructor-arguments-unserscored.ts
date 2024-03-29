import type { FunctionDefinition, Reporter, RuleMeta } from 'solhint';

const goodCode = `
pragma solidity 0.4.4;


contract C {
    constructor(uint a_);
}
`;
const badCode = `
pragma solidity 0.4.4;


contract C {
    constructor(uint a);
}
`;
export const meta: RuleMeta = {
    ruleId: 'constructor-arguments-unserscored',
    type: 'miscellaneous',

    docs: {
        description: 'All contract constructor arguments should be suffixed or prefixed with an underscore.',
        category: 'Miscellaneous',
        examples: {
            good: [
                {
                    description: 'Underscore suffix on constructor arguments',
                    code: goodCode,
                },
            ],
            bad: [
                {
                    description: 'Missing underscore suffix on constructor arguments',
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

export class UnderscoredConstructorArguments {
    private ruleId: string;

    private reporter: Reporter;

    private meta: RuleMeta;

    constructor(reporter: Reporter) {
        this.ruleId = meta.ruleId;
        this.reporter = reporter;
        this.meta = meta;
    }

    FunctionDefinition(ctx: FunctionDefinition) {
        if (!ctx.isConstructor) {
            return;
        }
        ctx.parameters.forEach(param => {
            if (param.name && param.name[param.name.length - 1] !== '_' && param.name[0] !== '_') {
                this.reporter.error(param, this.ruleId, 'No suffix at the end of constructor argument');
            }
        });
    }
}

export default { rule: UnderscoredConstructorArguments, meta };
