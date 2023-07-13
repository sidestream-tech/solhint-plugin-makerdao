"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const files = (0, fs_1.readdirSync)('./rules/');
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
const generateReport_1 = require("./helpers/generateReport");
describe('Rules have valid examples', () => {
    it('should have valid good examples', () => {
        metas.forEach((meta) => {
            const { ruleId } = meta;
            const reports = meta.docs.examples.good.map((example) => {
                const config = { [`makerdao/${ruleId}`]: 'error' };
                const report = (0, generateReport_1.default)(example.code, config);
                return report;
            });
            reports.forEach((report) => assertNoErrors(report));
        });
    });
    it('should have valid bad examples', () => {
        metas.forEach(meta => {
            const { ruleId } = meta;
            const reports = meta.docs.examples.bad.map((example) => {
                const config = { [`makerdao/${ruleId}`]: 'error' };
                const report = (0, generateReport_1.default)(example.code, config);
                return report;
            });
            reports.forEach((report) => expect(report.errorCount).toBeGreaterThan(0));
        });
    });
});
