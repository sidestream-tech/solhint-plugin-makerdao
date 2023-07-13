"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');
const generateReport_1 = require("../helpers/generateReport");
const correct_1 = require("../fixtures/constructors/correct");
const incorrect_1 = require("../fixtures/constructors/incorrect");
describe('Linter - underscore at the end of constructor argument', () => {
    it('missing underscore at the end of constructor argument reported', () => {
        const report = (0, generateReport_1.default)(contractWith(incorrect_1.unsuffixedArgs), {
            'makerdao/constructor-arguments-unserscored': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'No suffix at the end of constructor argument');
    });
    it('underscore at the end of constructor argument not reported', () => {
        const report = (0, generateReport_1.default)(contractWith(correct_1.suffixedArgs), {
            'makerdao/constructor-arguments-unserscored': 'error',
        });
        assertNoErrors(report);
    });
    it('underscore at the end of constructor argument not reported', () => {
        const report = (0, generateReport_1.default)(contractWith(correct_1.prefixedArgs), {
            'makerdao/constructor-arguments-unserscored': 'error',
        });
        assertNoErrors(report);
    });
});
