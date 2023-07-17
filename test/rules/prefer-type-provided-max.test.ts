import { contractWith } from 'solhint/test/common/contract-builder';
import { assertErrorCount, assertErrorMessage, assertNoErrors } from 'solhint/test/common/asserts';
import generateReport from '../helpers/generateReport';
import { typeProvidedMax } from '../fixtures/maxValue/correct';
import { conversionProvidedMax } from '../fixtures/maxValue/incorrect';

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
    it('should not report type provided max values for solidity below 0.7', () => {
        const processedStr = `
            pragma solidity ^0.6.12;
            ${contractWith(conversionProvidedMax)}
        `;
        const report = generateReport(processedStr, {
            'makerdao/prefer-type-provided-max': 'error',
        });
        assertNoErrors(report);
    });
});
