declare module 'solhint' {
    export interface LinterConfig {
        rules: Record<string, string>;
        plugins: string[];
    }
    export interface Reporter {
        error: (error: ASTNodeBase, ruleId: string, message: string, meta?: RuleMeta) => void;
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
    export interface ASTNodeLoc {
        start: {
            line: number;
            column: number;
        };
        end: {
            line: number;
            column: number;
        };
    }
    export interface ASTNodeBase {
        type: string;
        loc: ASTNodeLoc;
    }
    export interface ContractDefinition extends ASTNodeBase {
        type: 'ContractDefinition';
        name: string;
        subNodes: ASTNode[];
        kind: 'contract';
    }
    export interface ElementaryTypeName extends ASTNodeBase {
        type: 'ElementaryTypeName';
        name: string;
    }
    export interface NumberLiteral extends ASTNodeBase {
        type: 'NumberLiteral';
        number: string;
    }
    export interface VariableDeclaration extends ASTNodeBase {
        type: 'VariableDeclaration';
        typeName: ElementaryTypeName;
        name: string;
        expression: null | NumberLiteral;
        visibility: 'public' | 'private' | 'internal' | 'external' | 'default';
        identifier: ASTNodeBase;
        isStateVar: boolean;
        isIndexed: boolean;
    }
    export interface StateVariableDeclaration extends ASTNodeBase {
        type: 'StateVariableDeclaration';
        variables: VariableDeclaration[];
        initialValue: null | NumberLiteral;
    }
    export interface SourceUnit extends ASTNodeBase {
        type: 'SourceUnit';
    }
    export type ASTNode =
        | StateVariableDeclaration
        | ContractDefinition
        | VariableDeclaration
        | ElementaryTypeName
        | NumberLiteral
        | SourceUnit;
}
