"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const globals_1 = require("@jest/globals");
const { assertNoErrors } = require('solhint/test/common/asserts');
const generateReport_1 = require("./helpers/generateReport");
const rules_1 = require("../src/rules");
describe('Rules have valid examples', () => {
    const files = (0, fs_1.readdirSync)('./src/rules/');
    const relevantFiles = files.filter(file => file.endsWith('ts'));
    const metas = Object.entries(rules_1.default)
        .map(([_key, value]) => value.meta);
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
            reports.forEach((report) => (0, globals_1.expect)(report.errorCount).toBeGreaterThan(0));
        });
    });
});
