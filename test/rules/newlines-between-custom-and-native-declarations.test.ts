import { contractWith } from 'solhint/test/common/contract-builder';
import { assertErrorCount, assertErrorMessage, assertNoErrors } from 'solhint/test/common/asserts';
import generateReport from '../helpers/generateReport';
import { newlinesBetweenCustomAndNativeDeclarations } from '../fixtures/declarations/correct';
import { missingNewlinesBetweenCustomAndNativeDeclarations } from '../fixtures/declarations/incorrect';

describe('Linter - newlines between declarations', () => {
    it('should report declarations without newlines between custom and native types', () => {
        const report = generateReport(missingNewlinesBetweenCustomAndNativeDeclarations, {
            'makerdao/newlines-between-custom-and-native-declarations': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'Should have newlines between custom and native declarations');
    });
    it('should not report vertically aligned declarations', () => {
        const contractCode = contractWith(newlinesBetweenCustomAndNativeDeclarations);
        const report = generateReport(contractCode, {
            'makerdao/newlines-between-custom-and-native-declarations': 'error',
        });
        assertNoErrors(report);
    });
});
