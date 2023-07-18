declare module 'solhint' {
    export * from '@solidity-parser/parser/dist/src/ast-types';
    import type { BaseASTNode } from '@solidity-parser/parser/dist/src/ast-types';

    export type Visibility = 'public' | 'private' | 'internal' | 'external' | 'default';
    export interface LinterConfig {
        rules: Record<string, string>;
        plugins: string[];
    }
    export interface Reporter {
        error: (error: BaseASTNode, ruleId: string, message: string, meta?: RuleMeta) => void;
        errorCount: number;
    }
    export function processStr(sourceCode: string, config: LinterConfig): Reporter;
    interface MetaDocsExamples {
        good: { description: string; code: string }[];
        bad: { description: string; code: string }[];
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
        defaultSetup: 'warn' | 'error';
        schema: null;
    }
}

declare module 'solhint/test/common/asserts' {
    import type { Reporter } from 'solhint';

    export function assertNoErrors(reporter: Reporter): void;
    export function assertErrorCount(reporter: Reporter, count: number): void;
    export function assertErrorMessage(reporter: Reporter, message: string): void;
}
declare module 'solhint/test/common/contract-builder' {
    export function contractWith(sourceCode: string): string;
}
