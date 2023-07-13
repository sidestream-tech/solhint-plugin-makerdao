const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');

import generateReport from '../helpers/generateReport';
import { alignedAssignments } from '../fixtures/assignments/correct';
import { unalignedAssignments, multipleBlocksUnalignedAssignments } from '../fixtures/assignments/incorrect';

describe('Linter - vertically aligned assignments', () => {
    it('should report vertically unaligned assignments', () => {
        const processedStr = contractWith(unalignedAssignments);
        const report = generateReport(processedStr, {
            'makerdao/vertically-aligned-assignments': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'State variable assignments should be aligned');
    });
    it('should report vertically unaligned assignments in multiple blocks', () => {
        const processedStr = contractWith(multipleBlocksUnalignedAssignments);
        const report = generateReport(processedStr, {
            'makerdao/vertically-aligned-assignments': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'State variable assignments should be aligned');
    });
    it('should not report vertically aligned assignments', () => {
        const processedStr = contractWith(alignedAssignments);
        const report = generateReport(processedStr, {
            'makerdao/vertically-aligned-assignments': 'error',
        });
        assertNoErrors(report);
    });
});
