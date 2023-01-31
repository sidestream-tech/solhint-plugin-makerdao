const linter = require('solhint');
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');

const { suffixedArgs, prefixedArgs } = require('../fixtures/constructors/correct');
const { unsuffixedArgs } = require('../fixtures/constructors/incorrect');
describe('Linter - underscore at the end of constructor argument', () => {
    it('missing underscore at the end of constructor argument reported', () => {
        const report = linter.processStr(contractWith(unsuffixedArgs), {
            plugins: ['makerdao'],
            rules: {
                'makerdao/constructor-arguments-unserscored': 'error',
            },
        });
        assertErrorCount(report, 1);
        assertErrorMessage(report, 'No suffix at the end of constructor argument');
    });
    it('underscore at the end of constructor argument not reported', () => {
        const processedStr = contractWith(suffixedArgs);
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/constructor-arguments-unserscored': 'error',
            },
        });
        assertNoErrors(report);
    });
    it('underscore at the end of constructor argument not reported', () => {
        const report = linter.processStr(contractWith(prefixedArgs), {
            plugins: ['makerdao'],
            rules: {
                'makerdao/constructor-arguments-unserscored': 'error',
            },
        });
        assertNoErrors(report);
    });
});
