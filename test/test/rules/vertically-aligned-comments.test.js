const linter = require('solhint');
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');

describe('Linter - vertically aligned comments', () => {
    it('should report vertically unaligned comments', () => {
        const report = linter.processStr(contractWith(require('../fixtures/comments/incorrect/unalignedComments')), {
            plugins: ['makerdao'],
            rules: {
                'makerdao/vertically-aligned-comments': 'error',
            },
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'Comments should be vertically aligned.');
    });
    it('should report vertically unaligned comments within multiple blocks', () => {
        const report = linter.processStr(
            contractWith(require('../fixtures/comments/incorrect/unalignedCommentsMultiBlock')),
            {
                plugins: ['makerdao'],
                rules: {
                    'makerdao/vertically-aligned-comments': 'error',
                },
            }
        );
        assertErrorCount(report, 2);
        assertErrorMessage(report, 'Comments should be vertically aligned.');
    });
    it('should not report vertically aligned comments', () => {
        const processedStr = contractWith(require('../fixtures/comments/correct/alignedComments'));
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/vertically-aligned-comments': 'error',
            },
        });
        assertNoErrors(report);
    });
    it('should not report multiple blocks of vertically aligned comments', () => {
        const processedStr = contractWith(require('../fixtures/comments/correct/alignedCommentsMultiBlock'));
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/vertically-aligned-comments': 'error',
            },
        });
        assertNoErrors(report);
    });
});
