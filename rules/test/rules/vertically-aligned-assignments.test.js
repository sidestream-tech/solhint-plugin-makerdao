"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');
const generateReport_1 = require("../helpers/generateReport");
const correct_1 = require("../fixtures/assignments/correct");
const incorrect_1 = require("../fixtures/assignments/incorrect");
describe('Linter - vertically aligned assignments', () => {
    it('should report vertically unaligned assignments', () => {
        const processedStr = contractWith(incorrect_1.unalignedAssignments);
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/vertically-aligned-assignments': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'State variable assignments should be aligned');
    });
    it('should report vertically unaligned assignments in multiple blocks', () => {
        const processedStr = contractWith(incorrect_1.multipleBlocksUnalignedAssignments);
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/vertically-aligned-assignments': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'State variable assignments should be aligned');
    });
    it('should not report vertically aligned assignments', () => {
        const processedStr = contractWith(correct_1.alignedAssignments);
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/vertically-aligned-assignments': 'error',
        });
        assertNoErrors(report);
    });
});
