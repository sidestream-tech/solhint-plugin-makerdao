"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoNewlinesBetweenFunctionSignatures = exports.meta = void 0;
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
exports.meta = {
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
function getFunctionSignatureBlocks(ctx) {
    const functionSignatureBlocks = [];
    let functionSignatureBlock = [];
    for (const subNode of ctx.subNodes) {
        if (subNode.type === 'FunctionDefinition' && !subNode.body) {
            functionSignatureBlock.push(subNode);
        }
        else {
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
function validateNoNewlines(stateVariableDeclarationBlocks, ctx) {
    const errors = [];
    for (const block of stateVariableDeclarationBlocks) {
        const alignments = block.map((node) => [node.loc.start.line, node.loc.end.line]);
        for (let i = 0; i < alignments.length - 1; i += 1) {
            const endCurrentSignature = alignments[i][1];
            const startNextSignature = alignments[i + 1][0];
            if (endCurrentSignature < startNextSignature - 1) {
                errors.push(Object.assign(Object.assign({}, ctx), { loc: block[i].loc }));
            }
        }
    }
    return errors;
}
class NoNewlinesBetweenFunctionSignatures {
    constructor(reporter) {
        this.ruleId = exports.meta.ruleId;
        this.reporter = reporter;
        this.meta = exports.meta;
    }
    ContractDefinition(ctx) {
        const stateVariableDeclarationBlocks = getFunctionSignatureBlocks(ctx);
        const errors = validateNoNewlines(stateVariableDeclarationBlocks, ctx);
        errors.forEach(error => this.reporter.error(error, this.ruleId, 'No newlines allowed between function signatures'));
    }
}
exports.NoNewlinesBetweenFunctionSignatures = NoNewlinesBetweenFunctionSignatures;
exports.default = { NoNewlinesBetweenFunctionSignatures, meta: exports.meta };
