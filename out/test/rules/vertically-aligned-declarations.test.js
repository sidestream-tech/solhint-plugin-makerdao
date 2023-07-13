"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');
const generateReport_1 = require("../helpers/generateReport");
const correct_1 = require("../fixtures/declarations/correct");
const incorrect_1 = require("../fixtures/declarations/incorrect");
describe('Linter - vertically aligned declarations', () => {
    it('should report vertically unaligned declarations', () => {
        const processedStr = contractWith(incorrect_1.unalignedDeclarations);
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/vertically-aligned-declarations': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'State variable declarations should be aligned');
    });
    it('should not report vertically aligned declarations', () => {
        const processedStr = contractWith(correct_1.alignedDeclarations);
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/vertically-aligned-declarations': 'error',
        });
        assertNoErrors(report);
    });
    it('should not report vertically aligned declarations among multiple blocks', () => {
        const processedStr = contractWith(incorrect_1.unalignedDeclarationsMultipleBlocks);
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/vertically-aligned-declarations': 'error',
        });
        assertErrorCount(report, 2);
        assertErrorMessage(report, 'State variable declarations should be aligned');
    });
});
