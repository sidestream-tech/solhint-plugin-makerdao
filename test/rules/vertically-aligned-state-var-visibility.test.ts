import { contractWith } from 'solhint/test/common/contract-builder';
import { assertErrorCount, assertErrorMessage, assertNoErrors } from 'solhint/test/common/asserts';
import generateReport from '../helpers/generateReport';

import {
    alignedMultiLineDeclarationsMultiple,
    alignedVisivilityModifiers,
    singleVisivilityModifiers,
} from '../fixtures/declarations/correct';
import { unalignedVisibilityModifiers } from '../fixtures/declarations/incorrect';

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
