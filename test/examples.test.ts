import { expect } from '@jest/globals';
import generateReport from './helpers/generateReport';
import rules from '../src/rules';

const { assertNoErrors } = require('solhint/test/common/asserts');

describe('Rules have valid examples', () => {
    const metas = Object.values(rules).map(value => value.meta);
    it('should have valid good examples', () => {
        metas.forEach((meta: any) => {
            const { ruleId } = meta;
            const reports = meta.docs.examples.good.map((example: any) => {
                const config = { [`makerdao/${ruleId}`]: 'error' };
                const report = generateReport(example.code, config);
                return report;
            });

            reports.forEach((report: any) => assertNoErrors(report));
        });
    });
    it('should have valid bad examples', () => {
        metas.forEach(meta => {
            const { ruleId } = meta;
            const reports = meta.docs.examples.bad.map((example: any) => {
                const config = { [`makerdao/${ruleId}`]: 'error' };
                const report = generateReport(example.code, config);
                return report;
            });

            reports.forEach((report: any) => expect(report.errorCount).toBeGreaterThan(0));
        });
    });
});
