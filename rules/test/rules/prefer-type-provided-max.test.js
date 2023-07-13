"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');
const generateReport_1 = require("../helpers/generateReport");
const correct_1 = require("../fixtures/maxValue/correct");
const incorrect_1 = require("../fixtures/maxValue/incorrect");
describe('Linter - max value assignments', () => {
    it('should report type conversion max values', () => {
        const processedStr = `
            pragma solidity ^0.7.0;
            ${contractWith(incorrect_1.conversionProvidedMax)}
        `;
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/prefer-type-provided-max': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'Use type(uint256).max instead of uint256(-1)');
    });
    it('should not report type provided max values', () => {
        const processedStr = `
            pragma solidity ^0.7.0;
            ${contractWith(correct_1.typeProvidedMax)}
        `;
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/prefer-type-provided-max': 'error',
        });
        assertNoErrors(report);
    });
    it('should not report type provided max values for solidity below 0.7', () => {
        const processedStr = `
            pragma solidity ^0.6.12;
            ${contractWith(incorrect_1.conversionProvidedMax)}
        `;
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/prefer-type-provided-max': 'error',
        });
        assertNoErrors(report);
    });
});
