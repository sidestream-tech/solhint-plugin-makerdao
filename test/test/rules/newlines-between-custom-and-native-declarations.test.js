const linter = require('solhint');
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');

const { newlinesBetweenCustomAndNativeDeclarations } = require('../fixtures/declarations/correct');
const { missingNewlinesBetweenCustomAndNativeDeclarations } = require('../fixtures/declarations/incorrect');

describe('Linter - newlines between declarations', () => {
    it('should report declarations without newlines between custom and native types', () => {
        const report = linter.processStr(missingNewlinesBetweenCustomAndNativeDeclarations, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/newlines-between-custom-and-native-declarations': 'error',
            },
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'Should have newlines between custom and native declarations');
    });
    it('should not report vertically aligned declarations', () => {
        const processedStr = contractWith(newlinesBetweenCustomAndNativeDeclarations);
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/newlines-between-custom-and-native-declarations': 'error',
            },
        });
        assertNoErrors(report);
    });
});
