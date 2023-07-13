"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');
const generateReport_1 = require("../helpers/generateReport");
const incorrect_1 = require("../fixtures/functionSignatureNewLines/incorrect");
const correct_1 = require("../fixtures/functionSignatureNewLines/correct");
describe('Linter - newlines between function signatures', () => {
    it('should report signatures with newlines in between', () => {
        const report = (0, generateReport_1.default)(contractWith(incorrect_1.default), {
            'makerdao/no-newlines-between-function-signatures': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'No newlines allowed between function signatures');
    });
    it('should not report signatures without newlines in between', () => {
        const processedStr = contractWith(correct_1.noNewlinesBetweenSignatures);
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/no-newlines-between-function-signatures': 'error',
        });
        assertNoErrors(report);
    });
    it('should not report functions with newlines in between', () => {
        const processedStr = contractWith(correct_1.newlinesBetweenFunctions);
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/no-newlines-between-function-signatures': 'error',
        });
        assertNoErrors(report);
    });
});
