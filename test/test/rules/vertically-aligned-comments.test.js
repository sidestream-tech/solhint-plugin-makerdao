const linter = require('solhint');
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');

const { unalignedComments, unalignedCommentsMultiBlock } = require('../fixtures/comments/incorrect');
const { alignedComments, alignedCommentsMultiBlock } = require('../fixtures/comments/correct');
describe('Linter - vertically aligned comments', () => {
    it('should report vertically unaligned comments', () => {
        const report = linter.processStr(contractWith(unalignedComments), {
            plugins: ['makerdao'],
            rules: {
                'makerdao/vertically-aligned-comments': 'error',
            },
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'Comments should be vertically aligned.');
    });
    it('should report vertically unaligned comments within multiple blocks', () => {
        const report = linter.processStr(contractWith(unalignedCommentsMultiBlock), {
            plugins: ['makerdao'],
            rules: {
                'makerdao/vertically-aligned-comments': 'error',
            },
        });
        assertErrorCount(report, 2);
        assertErrorMessage(report, 'Comments should be vertically aligned.');
    });
    it('should not report vertically aligned comments', () => {
        const processedStr = contractWith(alignedComments);
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/vertically-aligned-comments': 'error',
            },
        });
        assertNoErrors(report);
    });
    it('should not report multiple blocks of vertically aligned comments', () => {
        const processedStr = contractWith(alignedCommentsMultiBlock);
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/vertically-aligned-comments': 'error',
            },
        });
        assertNoErrors(report);
    });
});
