const linter = require('solhint');

const generateReport = (contractCode: string, rules: Record<string, string>) => {
    const report = linter.processStr(contractCode, {
        plugins: ['makerdao'],
        rules,
    });
    return report;
};

export default generateReport;
