declare module 'solhint' {
    export type Visibility = 'public' | 'private' | 'internal' | 'external' | 'default';
    export interface LinterConfig {
        rules: Record<string, string>;
        plugins: string[];
    }
    export interface Reporter {
        error: (error: ASTNodeBase, ruleId: string, message: string, meta?: RuleMeta) => void;
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
        operator: string | null;
    }
    export interface VariableDeclaration extends ASTNodeBase {
        type: 'VariableDeclaration';
        typeName: ElementaryTypeName;
        name: string;
        expression: null | NumberLiteral;
        visibility: Visibility;
        identifier: ASTNodeBase;
        isStateVar: boolean;
        isDeclaredConst: boolean;
        isIndexed: boolean;
    }
    export interface UnaryOperation extends ASTNodeBase {
        type: 'UnaryOperation';
        operator: string;
        subExpression: NumberLiteral;
        isPrefix: boolean;
    }
    export interface StateVariableDeclaration extends ASTNodeBase {
        type: 'StateVariableDeclaration';
        variables: VariableDeclaration[];
        initialValue: null | NumberLiteral;
    }
    export interface SourceUnit extends ASTNodeBase {
        type: 'SourceUnit';
    }
    export interface Identifier extends ASTNodeBase {
        type: 'Identifier';
        name: string;
    }
    export interface BinaryOperation extends ASTNodeBase {
        type: 'BinaryOperation';
        operator: string;
        left: Identifier;
        right: Identifier;
    }
    export type Expression = BinaryOperation | Identifier | ElementaryTypeName | NumberLiteral;
    export interface ExpressionStatement extends ASTNodeBase {
        type: 'ExpressionStatement';
        expression: Expression;
    }
    export type Statement = ExpressionStatement;
    export interface Block {
        type: 'Block';
        statements: Statement[];
    }
    export interface FunctionDefinition extends ASTNodeBase {
        type: 'FunctionDefinition';
        name: string;
        parameters: VariableDeclaration[];
        returnParameters: null | VariableDeclaration[];
        visibility: Visibility;
        body: Block;
        isConstructor: boolean;
    }
    export interface PragmaDirective extends ASTNodeBase {
        type: 'PragmaDirective';
        name: string;
        value: string;
    }
    export type Literal = NumberLiteral | UnaryOperation;
    export interface FunctionCall extends ASTNodeBase {
        type: 'FunctionCall';
        expression: Expression;
        arguments: Literal[];
        names: string[];
    }
    export type ASTNode =
        | StateVariableDeclaration
        | ContractDefinition
        | VariableDeclaration
        | ElementaryTypeName
        | NumberLiteral
        | SourceUnit
        | FunctionDefinition
        | Block
        | ExpressionStatement
        | BinaryOperation
        | FunctionCall
        | PragmaDirective
        | UnaryOperation;
}

declare module 'solhint/test/common/asserts' {
    import type { Reporter } from 'solhint';

    export function assertNoErrors(reporter: Reporter): void;
}
