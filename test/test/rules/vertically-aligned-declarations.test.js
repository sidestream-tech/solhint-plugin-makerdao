const linter = require('solhint');
const { contractWith } = require('solhint/test/common/contract-builder');
const { assertErrorCount, assertErrorMessage, assertNoErrors } = require('solhint/test/common/asserts');

describe('Linter - vertically aligned comments', () => {
    it('should not report vertically aligned comments', () => {
        const processedStr = contractWith(require('../fixtures/declarations/alignedDeclarations'));
        const report = linter.processStr(processedStr, {
            plugins: ['makerdao'],
            rules: {
                'makerdao/vertically-aligned-declarations': 'error',
            },
        });
        assertNoErrors(report);
    });
});
