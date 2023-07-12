const linter = require('solhint');

const generateReport = (contractCode, rules) => {
    const report = linter.processStr(contractCode, {
        plugins: ['makerdao'],
        rules,
    });
    return report;
};

module.exports = generateReport;
