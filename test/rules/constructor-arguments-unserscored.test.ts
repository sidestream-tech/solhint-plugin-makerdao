import { contractWith } from 'solhint/test/common/contract-builder';
import { assertErrorCount, assertErrorMessage, assertNoErrors } from 'solhint/test/common/asserts';
import generateReport from '../helpers/generateReport';
import { suffixedArgs, prefixedArgs } from '../fixtures/constructors/correct';
import { unsuffixedArgs } from '../fixtures/constructors/incorrect';

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
