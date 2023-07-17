declare module 'solhint' {
    export interface LinterConfig {
        rules: Record<string,string>;
        plugins: string[];
    }
    export interface Reporter {
        error: (error: Error, ruleId: string, message: string, meta?: RuleMeta) => void;
    }
    export function processStr(sourceCode: string, config: LinterConfig): Reporter;
    interface MetaDocsExamples {
        good: {description: string; code: string}[];
        bad: {description: string; code: string}[];
    }
    interface MetaDocs {
        description: string;
        category: 'Miscellaneous';
        examples: MetaDocsExamples;
    }
    export interface RuleMeta {
        ruleId: string;
        type: 'miscellaneous';
        docs: MetaDocs;
        isDefault: boolean;
        recommended: boolean;
        defaultSetup: 'warn' | 'error',
        schema: null,
    }
}
