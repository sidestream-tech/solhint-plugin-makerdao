const linter = require('solhint');
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');

const functionSignatureNewLines = require('../fixtures/functionSignatureNewLines/incorrect');
const {noNewlinesBetweenSignatures, newlinesBetweenFunctions} = require('../fixtures/functionSignatureNewLines/correct');
describe('Linter - newlines between function signatures', () => {
    it('should report signatures with newlines in between', () => {
        const report = linter.processStr(contractWith(functionSignatureNewLines), {
            plugins: ['makerdao'],
            rules: {
                'makerdao/no-newlines-between-function-signatures': 'error',
            },
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'No newlines allowed between function signatures');
    });
    it('should not report signatures without newlines in between', () => {
        const processedStr = contractWith(noNewlinesBetweenSignatures);
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/no-newlines-between-function-signatures': 'error',
            },
        });
        assertNoErrors(report);
    });
    it('should not report functions with newlines in between', () => {
        const processedStr = contractWith(newlinesBetweenFunctions);
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/no-newlines-between-function-signatures': 'error',
            },
        });
        assertNoErrors(report);
    });
});
