const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');
const generateReport = require('../helpers/generateReport');

const { capitalSnakeCaseConst } = require('../fixtures/capitalSnakeCase/correct');
const { capitalSnakeCase } = require('../fixtures/capitalSnakeCase/incorrect');
describe('Linter - capitalized snake case variables', () => {
    it('capitalized snake case non-constant reported', () => {
        const report = generateReport(contractWith(capitalSnakeCase), {
            'makerdao/capitalized-snake-only-for-const': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'Variable name is in all caps and snake case, but is not constant');
    });
    it('capitalized snake case constant not reported', () => {
        const report = generateReport(contractWith(capitalSnakeCaseConst), {
            'makerdao/capitalized-snake-only-for-const': 'error',
        });
        assertNoErrors(report);
    });
});
