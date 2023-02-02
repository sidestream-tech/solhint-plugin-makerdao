const fs = require('fs');
const files = fs.readdirSync('./rules/');
const relevantFiles = files.filter(file => file.endsWith('js'));
const expect = require('@jest/globals').expect;
const metas = relevantFiles
    .map(file => file.replace('.js', ''))
    .map(file => {
        const { meta } = require(`../rules/${file}`);
        return meta;
    });
const generateReport = require('./helpers/generateReport');
const { assertNoErrors, assertErrorCount } = require('solhint/test/common/asserts');

describe('Rules have valid examples', () => {
    it('should have valid good examples', () => {
        metas.forEach(meta => {
            const ruleId = meta.ruleId;
            const reports = meta.docs.examples.good.map(example => {
                const config = { ['makerdao/' + ruleId]: 'error' };
                const report = generateReport(example.code, config);
                return report;
            });

            reports.forEach(report => assertNoErrors(report));
        });
    });
    it('should have valid bad examples', () => {
        metas.forEach(meta => {
            const ruleId = meta.ruleId;
            const reports = meta.docs.examples.bad.map(example => {
                const config = { ['makerdao/' + ruleId]: 'error' };
                const report = generateReport(example.code, config);
                return report;
            });

            reports.forEach(report => expect(report.errorCount).toBeGreaterThan(0));
        });
    });
});
