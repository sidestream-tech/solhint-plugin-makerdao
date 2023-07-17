declare module 'solhint' {
    export interface LinterConfig {
        rules: Record<string,string>;
        plugins: string[];
    }
    export interface Reporter {}
    export function processStr(sourceCode: string, config: LinterConfig): Reporter;
}
