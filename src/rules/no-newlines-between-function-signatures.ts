const goodCode = `
pragma solidity 0.4.4;


contract C {
    function a() public;
    function b() public;
}
`;
const badCode = `
pragma solidity 0.4.4;


contract C {
    function a() public;

    function b() public;
}
`;
export const meta = {
    ruleId: 'no-newlines-between-function-signatures',
    type: 'miscellaneous',

    docs: {
        description: 'Check that no newlines are between function signatures.',
        category: 'Miscellaneous',
        examples: {
            good: [
                {
                    description: 'No empty lines between function signatures',
                    code: goodCode,
                },
            ],
            bad: [
                {
                    description: 'Empty lines between function signatures',
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
function getFunctionSignatureBlocks(ctx: any) {
    const functionSignatureBlocks = [];
    let functionSignatureBlock = [];
    for (const subNode of ctx.subNodes) {
        if (subNode.type === 'FunctionDefinition' && !subNode.body) {
            functionSignatureBlock.push(subNode);
        } else {
            if (functionSignatureBlock.length) {
                functionSignatureBlocks.push(functionSignatureBlock);
            }
            functionSignatureBlock = [];
        }
    }
    if (functionSignatureBlock.length) {
        functionSignatureBlocks.push(functionSignatureBlock);
    }
    return functionSignatureBlocks;
}

function validateNoNewlines(stateVariableDeclarationBlocks: any, ctx: any) {
    const errors = [];
    for (const block of stateVariableDeclarationBlocks) {
        const alignments = block.map((node: any) => [node.loc.start.line, node.loc.end.line]);
        for (let i = 0; i < alignments.length - 1; i += 1) {
            const endCurrentSignature = alignments[i][1];
            const startNextSignature = alignments[i + 1][0];
            if (endCurrentSignature < startNextSignature - 1) {
                errors.push({ ...ctx, loc: block[i].loc });
            }
        }
    }
    return errors;
}

export class NoNewlinesBetweenFunctionSignatures {
    private ruleId: string;

    private reporter: any;

    private meta: any;

    constructor(reporter: any) {
        this.ruleId = meta.ruleId;
        this.reporter = reporter;
        this.meta = meta;
    }

    ContractDefinition(ctx: any) {
        const stateVariableDeclarationBlocks = getFunctionSignatureBlocks(ctx);
        const errors = validateNoNewlines(stateVariableDeclarationBlocks, ctx);
        errors.forEach(error =>
            this.reporter.error(error, this.ruleId, 'No newlines allowed between function signatures')
        );
    }
}

export default { NoNewlinesBetweenFunctionSignatures, meta };
