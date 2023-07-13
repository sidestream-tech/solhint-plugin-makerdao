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
export const meta = {
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

    private reporter: any;

    private meta: any;

    constructor(reporter: any) {
        this.ruleId = meta.ruleId;
        this.reporter = reporter;
        this.meta = meta;
    }

    FunctionDefinition(ctx: any) {
        if (!ctx.isConstructor) {
            return;
        }
        ctx.parameters.forEach((param: any) => {
            if (param.name[param.name.length - 1] !== '_' && param.name[0] !== '_') {
                this.reporter.error(param, this.ruleId, 'No suffix at the end of constructor argument');
            }
        });
    }
}

export default { UnderscoredConstructorArguments, meta };