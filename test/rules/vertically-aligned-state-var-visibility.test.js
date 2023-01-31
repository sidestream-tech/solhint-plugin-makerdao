const linter = require('solhint');
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');

const {
    alignedMultiLineDeclarationsMultiple,
    alignedVisivilityModifiers,
} = require('../fixtures/declarations/correct');
const { unalignedVisibilityModifiers } = require('../fixtures/declarations/incorrect');

describe('Linter - vertically aligned visibility modifiers', () => {
    it('should report vertically unaligned visibility modifiers', () => {
        const processedStr = contractWith(unalignedVisibilityModifiers);
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/vertically-aligned-state-var-visibility': 'error',
            },
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'State variable visibility modifiers should be aligned');
    });
    it('should not report vertically aligned visibility modifiers', () => {
        const processedStr = contractWith(alignedVisivilityModifiers);
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/vertically-aligned-state-var-visibility': 'error',
            },
        });
        assertNoErrors(report);
    });
    it('should not report vertically aligned visibility modifiers for multilines', () => {
        const processedStr = contractWith(alignedMultiLineDeclarationsMultiple);
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/vertically-aligned-state-var-visibility': 'error',
            },
        });
        assertNoErrors(report);
    });
});
