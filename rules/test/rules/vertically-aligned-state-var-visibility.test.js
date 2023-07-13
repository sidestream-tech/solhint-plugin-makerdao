"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');
const generateReport_1 = require("../helpers/generateReport");
const correct_1 = require("../fixtures/declarations/correct");
const { unalignedVisibilityModifiers } = require('../fixtures/declarations/incorrect');
describe('Linter - vertically aligned visibility modifiers', () => {
    it('should report vertically unaligned visibility modifiers', () => {
        const processedStr = contractWith(unalignedVisibilityModifiers);
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/vertically-aligned-state-var-visibility': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'State variable visibility modifiers should be aligned');
    });
    it('should not report vertically aligned visibility modifiers', () => {
        const processedStr = contractWith(correct_1.alignedVisivilityModifiers);
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/vertically-aligned-state-var-visibility': 'error',
        });
        assertNoErrors(report);
    });
    it('should not report vertically aligned visibility modifiers for multilines', () => {
        const processedStr = contractWith(correct_1.alignedMultiLineDeclarationsMultiple);
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/vertically-aligned-state-var-visibility': 'error',
        });
        assertNoErrors(report);
    });
    it('should not report vertically aligned visibility modifiers for single variable', () => {
        const processedStr = contractWith(correct_1.singleVisivilityModifiers);
        const report = (0, generateReport_1.default)(processedStr, {
            'makerdao/vertically-aligned-state-var-visibility': 'error',
        });
        assertNoErrors(report);
    });
});
