"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linter = require('solhint');
const generateReport = (contractCode, rules) => {
    const report = linter.processStr(contractCode, {
        plugins: ['makerdao'],
        rules,
    });
    return report;
};
exports.default = generateReport;
