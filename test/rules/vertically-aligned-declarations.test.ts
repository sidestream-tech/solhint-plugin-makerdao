import { contractWith } from 'solhint/test/common/contract-builder';
import { assertErrorCount, assertErrorMessage, assertNoErrors } from 'solhint/test/common/asserts';
import generateReport from '../helpers/generateReport';
import { alignedDeclarations } from '../fixtures/declarations/correct';
import { unalignedDeclarations, unalignedDeclarationsMultipleBlocks } from '../fixtures/declarations/incorrect';

describe('Linter - vertically aligned declarations', () => {
    it('should report vertically unaligned declarations', () => {
        const processedStr = contractWith(unalignedDeclarations);
        const report = generateReport(processedStr, {
            'makerdao/vertically-aligned-declarations': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'State variable declarations should be aligned');
    });
    it('should not report vertically aligned declarations', () => {
        const processedStr = contractWith(alignedDeclarations);
        const report = generateReport(processedStr, {
            'makerdao/vertically-aligned-declarations': 'error',
        });
        assertNoErrors(report);
    });
    it('should not report vertically aligned declarations among multiple blocks', () => {
        const processedStr = contractWith(unalignedDeclarationsMultipleBlocks);
        const report = generateReport(processedStr, {
            'makerdao/vertically-aligned-declarations': 'error',
        });
        assertErrorCount(report, 2);
        assertErrorMessage(report, 'State variable declarations should be aligned');
    });
});
