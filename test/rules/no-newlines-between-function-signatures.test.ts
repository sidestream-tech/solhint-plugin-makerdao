import generateReport from '../helpers/generateReport';
import { newlinesBetweenSignatures } from '../fixtures/functionSignatureNewLines/incorrect';
import { noNewlinesBetweenSignatures, newlinesBetweenFunctions } from '../fixtures/functionSignatureNewLines/correct';

const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');

describe('Linter - newlines between function signatures', () => {
    it('should report signatures with newlines in between', () => {
        const report = generateReport(contractWith(newlinesBetweenSignatures), {
            'makerdao/no-newlines-between-function-signatures': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'No newlines allowed between function signatures');
    });
    it('should not report signatures without newlines in between', () => {
        const processedStr = contractWith(noNewlinesBetweenSignatures);
        const report = generateReport(processedStr, {
            'makerdao/no-newlines-between-function-signatures': 'error',
        });
        assertNoErrors(report);
    });
    it('should not report functions with newlines in between', () => {
        const processedStr = contractWith(newlinesBetweenFunctions);
        const report = generateReport(processedStr, {
            'makerdao/no-newlines-between-function-signatures': 'error',
        });
        assertNoErrors(report);
    });
});
