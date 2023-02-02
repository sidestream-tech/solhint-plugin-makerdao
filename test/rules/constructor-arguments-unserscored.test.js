const generateReport = require('../helpers/generateReport');
const linter = require('solhint');
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');

const { suffixedArgs, prefixedArgs } = require('../fixtures/constructors/correct');
const { unsuffixedArgs } = require('../fixtures/constructors/incorrect');
describe('Linter - underscore at the end of constructor argument', () => {
    it('missing underscore at the end of constructor argument reported', () => {
        const report = generateReport(contractWith(unsuffixedArgs), {
            'makerdao/constructor-arguments-unserscored': 'error',
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'No suffix at the end of constructor argument');
    });
    it('underscore at the end of constructor argument not reported', () => {
        const report = generateReport(contractWith(suffixedArgs), {
            'makerdao/constructor-arguments-unserscored': 'error',
        });
        assertNoErrors(report);
    });
    it('underscore at the end of constructor argument not reported', () => {
        const report = generateReport(contractWith(prefixedArgs), {
            'makerdao/constructor-arguments-unserscored': 'error',
        });
        assertNoErrors(report);
    });
});
