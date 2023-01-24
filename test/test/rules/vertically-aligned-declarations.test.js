const linter = require('solhint');
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');

describe('Linter - vertically aligned comments', () => {
    it('should report vertically unaligned comments', () => {
        const processedStr = contractWith(require('../fixtures/declarations/unalignedDeclarations'));
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/vertically-aligned-declarations': 'error',
            },
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'State variable declarations should be aligned');
    });
    it('should not report vertically aligned comments', () => {
        const processedStr = contractWith(require('../fixtures/declarations/alignedDeclarations'));
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/vertically-aligned-declarations': 'error',
            },
        });
        assertNoErrors(report);
    });
    it('should not report vertically aligned comments among multiple blocks', () => {
        const processedStr = contractWith(require('../fixtures/declarations/unalignedDeclarationsMultipleBlocks'));
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/vertically-aligned-declarations': 'error',
            },
        });
        assertErrorCount(report, 2);
        assertErrorMessage(report, 'State variable declarations should be aligned');
    });
});
