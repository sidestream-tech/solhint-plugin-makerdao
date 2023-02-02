const generateReport = require('../helpers/generateReport');
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');

const { alignedDeclarations } = require('../fixtures/declarations/correct');
const { unalignedDeclarations, unalignedDeclarationsMultipleBlocks } = require('../fixtures/declarations/incorrect');

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
