"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewlinesBetweenCustomAndNativeDeclarations = exports.meta = void 0;
const getStateVariableDeclarationBlocks_1 = require("./utils/getStateVariableDeclarationBlocks");
const goodCode = `
pragma solidity 0.4.4;


contract C {
    uint256 public a;

    cutomInterface public item;
}
`;
const badCode = `
pragma solidity 0.4.4;


contract C {
    uint256 public a;
    uint public b;
    MyInterface public interface;
}
`;
const lineBreakPattern = /\r\n|[\r\n\u2028\u2029]/u;
exports.meta = {
    ruleId: 'newlines-between-custom-and-native-declarations',
    type: 'miscellaneous',
    docs: {
        description: 'Check that declarations of contract variables have their names aligned vertically.',
        category: 'Miscellaneous',
        examples: {
            good: [
                {
                    description: 'Newline between custom interface and native type',
                    code: goodCode,
                },
            ],
            bad: [
                {
                    description: 'No newline between custom interface and native type',
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
function validateVerticalDeclarationAlignments(stateVariableDeclarationBlocks, _ctx) {
    const errors = [];
    for (const block of stateVariableDeclarationBlocks) {
        for (let i = 1; i < block.length; i++) {
            const currentVariable = block[i].variables[0];
            const previousVariable = block[i - 1].variables[0];
            if (currentVariable.typeName.type === previousVariable.typeName.type) {
                continue;
            }
            errors.push(Object.assign({}, block[i]));
        }
    }
    return errors;
}
class NewlinesBetweenCustomAndNativeDeclarations {
    constructor(reporter) {
        this.ruleId = exports.meta.ruleId;
        this.reporter = reporter;
        this.meta = exports.meta;
    }
    ContractDefinition(ctx) {
        const stateVariableDeclarationBlocks = (0, getStateVariableDeclarationBlocks_1.default)(ctx);
        const errors = validateVerticalDeclarationAlignments(stateVariableDeclarationBlocks, ctx);
        errors.forEach(error => this.reporter.error(error, this.ruleId, 'Should have newlines between custom and native declarations'));
    }
}
exports.NewlinesBetweenCustomAndNativeDeclarations = NewlinesBetweenCustomAndNativeDeclarations;
exports.default = { NewlinesBetweenCustomAndNativeDeclarations, meta: exports.meta };
