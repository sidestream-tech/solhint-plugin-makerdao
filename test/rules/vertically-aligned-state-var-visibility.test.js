const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');
const generateReport = require('../helpers/generateReport');

const {
    alignedMultiLineDeclarationsMultiple,
    alignedVisivilityModifiers,
    singleVisivilityModifiers,
} = require('../fixtures/declarations/correct');
const { unalignedVisibilityModifiers } = require('../fixtures/declarations/incorrect');

describe('Linter - vertically aligned visibility modifiers', () => {
    it('should report vertically unaligned visibility modifiers', () => {
        const processedStr = contractWith(unalignedVisibilityModifiers);
        const report = generateReport(processedStr, {
            'makerdao/vertically-aligned-state-var-visibility': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'State variable visibility modifiers should be aligned');
    });
    it('should not report vertically aligned visibility modifiers', () => {
        const processedStr = contractWith(alignedVisivilityModifiers);
        const report = generateReport(processedStr, {
            'makerdao/vertically-aligned-state-var-visibility': 'error',
        });
        assertNoErrors(report);
    });
    it('should not report vertically aligned visibility modifiers for multilines', () => {
        const processedStr = contractWith(alignedMultiLineDeclarationsMultiple);
        const report = generateReport(processedStr, {
            'makerdao/vertically-aligned-state-var-visibility': 'error',
        });
        assertNoErrors(report);
    });
    it('should not report vertically aligned visibility modifiers for single variable', () => {
        const processedStr = contractWith(singleVisivilityModifiers);
        const report = generateReport(processedStr, {
            'makerdao/vertically-aligned-state-var-visibility': 'error',
        });
        assertNoErrors(report);
    });
});
