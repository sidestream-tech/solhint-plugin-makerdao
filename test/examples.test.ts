import { readdirSync } from 'fs';

const files = readdirSync('./rules/');
const relevantFiles = files.filter(file => file.endsWith('js'));
const { expect } = require('@jest/globals');

const metas = relevantFiles
    .map(file => file.replace('.js', ''))
    .map(file => {
        // TODO: convert the project to TS and use proper imports
        // eslint-disable-next-line global-require,import/no-dynamic-require
        const { meta } = require(`../rules/${file}`);
        return meta;
    });
const { assertNoErrors } = require('solhint/test/common/asserts');
import generateReport from './helpers/generateReport';

describe('Rules have valid examples', () => {
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
