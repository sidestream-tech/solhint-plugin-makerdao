import {processStr} from 'solhint';

const generateReport = (contractCode: string, rules: Record<string, string>) => {
    const report = processStr(contractCode, {
        plugins: ['makerdao'],
        rules,
    });
    return report;
};

export default generateReport;
