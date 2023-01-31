const linter = require('solhint');
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');

const { capitalSnakeCaseConst } = require('../fixtures/capitalSnakeCase/correct');
const { capitalSnakeCase } = require('../fixtures/capitalSnakeCase/incorrect');
describe('Linter - capitalized snake case variables', () => {
    it('capitalized snake case non-constant reported', () => {
        const report = linter.processStr(contractWith(capitalSnakeCase), {
            plugins: ['makerdao'],
            rules: {
                'makerdao/capitalized-snake-only-for-const': 'error',
            },
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'Variable name is in all caps and snake case, but is not constant');
    });
    it('capitalized snake case constant not reported', () => {
        const processedStr = contractWith(capitalSnakeCaseConst);
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/capitalized-snake-only-for-const': 'error',
            },
        });
        assertNoErrors(report);
    });
});
