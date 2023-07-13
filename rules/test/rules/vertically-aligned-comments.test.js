"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');
const generateReport_1 = require("../helpers/generateReport");
const incorrect_1 = require("../fixtures/comments/incorrect");
const correct_1 = require("../fixtures/comments/correct");
describe('Linter - vertically aligned comments', () => {
    it('should report vertically unaligned comments', () => {
        const report = (0, generateReport_1.default)(contractWith(incorrect_1.unalignedComments), {
            'makerdao/vertically-aligned-comments': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'Comments should be vertically aligned.');
    });
    it('should report vertically unaligned comments within multiple blocks', () => {
        const report = (0, generateReport_1.default)(contractWith(incorrect_1.unalignedCommentsMultiBlock), {
            'makerdao/vertically-aligned-comments': 'error',
        });
        assertErrorCount(report, 2);
        assertErrorMessage(report, 'Comments should be vertically aligned.');
    });
    it('should not report vertically aligned comments', () => {
        const processedStr = contractWith(correct_1.alignedComments);
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/vertically-aligned-comments': 'error',
        });
        assertNoErrors(report);
    });
    it('should not report multiple blocks of vertically aligned comments', () => {
        const processedStr = contractWith(correct_1.alignedCommentsMultiBlock);
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/vertically-aligned-comments': 'error',
        });
        assertNoErrors(report);
    });
});
