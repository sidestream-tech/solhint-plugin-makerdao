"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');
const generateReport_1 = require("../helpers/generateReport");
const correct_1 = require("../fixtures/declarations/correct");
const incorrect_1 = require("../fixtures/declarations/incorrect");
describe('Linter - newlines between declarations', () => {
    it('should report declarations without newlines between custom and native types', () => {
        const report = (0, generateReport_1.default)(incorrect_1.missingNewlinesBetweenCustomAndNativeDeclarations, {
            'makerdao/newlines-between-custom-and-native-declarations': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'Should have newlines between custom and native declarations');
    });
    it('should not report vertically aligned declarations', () => {
        const contractCode = contractWith(correct_1.newlinesBetweenCustomAndNativeDeclarations);
        const report = (0, generateReport_1.default)(contractCode, {
            'makerdao/newlines-between-custom-and-native-declarations': 'error',
        });
        assertNoErrors(report);
    });
});
