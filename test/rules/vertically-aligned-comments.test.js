const generateReport = require('../helpers/generateReport');
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');

const { unalignedComments, unalignedCommentsMultiBlock } = require('../fixtures/comments/incorrect');
const { alignedComments, alignedCommentsMultiBlock } = require('../fixtures/comments/correct');
describe('Linter - vertically aligned comments', () => {
    it('should report vertically unaligned comments', () => {
        const report = generateReport(contractWith(unalignedComments), {
            'makerdao/vertically-aligned-comments': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'Comments should be vertically aligned.');
    });
    it('should report vertically unaligned comments within multiple blocks', () => {
        const report = generateReport(contractWith(unalignedCommentsMultiBlock), {
            'makerdao/vertically-aligned-comments': 'error',
        });
        assertErrorCount(report, 2);
        assertErrorMessage(report, 'Comments should be vertically aligned.');
    });
    it('should not report vertically aligned comments', () => {
        const processedStr = contractWith(alignedComments);
        const report = generateReport(processedStr, {
            'makerdao/vertically-aligned-comments': 'error',
        });
        assertNoErrors(report);
    });
    it('should not report multiple blocks of vertically aligned comments', () => {
        const processedStr = contractWith(alignedCommentsMultiBlock);
        const report = generateReport(processedStr, {
            'makerdao/vertically-aligned-comments': 'error',
        });
        assertNoErrors(report);
    });
});
