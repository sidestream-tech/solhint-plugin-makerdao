"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');
const generateReport_1 = require("../helpers/generateReport");
const correct_1 = require("../fixtures/capitalSnakeCase/correct");
const incorrect_1 = require("../fixtures/capitalSnakeCase/incorrect");
describe('Linter - capitalized snake case variables', () => {
    it('capitalized snake case non-constant reported', () => {
        const report = (0, generateReport_1.default)(contractWith(incorrect_1.capitalSnakeCase), {
            'makerdao/capitalized-snake-only-for-const': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'Variable name is in all caps and snake case, but is not constant');
    });
    it('capitalized snake case constant not reported', () => {
        const report = (0, generateReport_1.default)(contractWith(correct_1.capitalSnakeCaseConst), {
            'makerdao/capitalized-snake-only-for-const': 'error',
        });
        assertNoErrors(report);
    });
});
