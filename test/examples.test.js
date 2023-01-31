const fs = require('fs');
const files = fs.readdirSync('./rules/');
const relevantFiles = files.filter(file => file.endsWith('js'));
const metas = relevantFiles
    .map(file => file.replace('.js', ''))
    .map(file => {
        const { meta } = require(`../rules/${file}`);
        return meta;
    });
const generateReport = require('./helpers/generateReport');
const { assertNoErrors } = require('solhint/test/common/asserts');

describe('Rules have valid examples', () => {
    it('should have valid examples', () => {
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
});
