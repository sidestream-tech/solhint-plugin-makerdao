const linter = require('solhint');
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');

const { typeProvidedMax } = require('../fixtures/maxValue/correct');
const { conversionProvidedMax } = require('../fixtures/maxValue/incorrect');

describe('Linter - max value assignments', () => {
    it('should report type conversion max values', () => {
        const processedStr = contractWith(conversionProvidedMax);
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/prefer-type-provided-max': 'error',
            },
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'Use type(uint256).max instead of uint256(-1)');
    });
    it('should not report type provided max values', () => {
        const processedStr = contractWith(typeProvidedMax);
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/prefer-type-provided-max': 'error',
            },
        });
        assertNoErrors(report);
    });
});
