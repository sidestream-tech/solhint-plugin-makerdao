const generateReport = require('../helpers/generateReport');
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');

const { typeProvidedMax } = require('../fixtures/maxValue/correct');
const { conversionProvidedMax } = require('../fixtures/maxValue/incorrect');

describe('Linter - max value assignments', () => {
    it('should report type conversion max values', () => {
        const processedStr = `
            pragma solidity ^0.7.0;
            ${contractWith(conversionProvidedMax)}
        `;
        const report = generateReport(processedStr, {
            'makerdao/prefer-type-provided-max': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'Use type(uint256).max instead of uint256(-1)');
    });
    it('should not report type provided max values', () => {
        const processedStr = `
            pragma solidity ^0.7.0;
            ${contractWith(typeProvidedMax)}
        `;
        const report = generateReport(processedStr, {
            'makerdao/prefer-type-provided-max': 'error',
        });
        assertNoErrors(report);
    });
});
