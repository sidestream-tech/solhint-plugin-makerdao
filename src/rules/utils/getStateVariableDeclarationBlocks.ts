import type { ContractDefinition, StateVariableDeclaration } from 'solhint';

function isDeclarationFirstInBlock(startLine: number, previousLineOrNull: number | null) {
    return previousLineOrNull === null || startLine === previousLineOrNull + 1;
}
function getStateVariableDeclarationBlocks(ctx: ContractDefinition) {
    const stateVariableDeclarationBlocks: StateVariableDeclaration[][] = [];
    let stateVariableDeclarationBlock: StateVariableDeclaration[] = [];
    let previousLine = null;
    for (const subNode of ctx.subNodes) {
        if (
            subNode.type === 'StateVariableDeclaration' &&
            subNode.loc &&
            isDeclarationFirstInBlock(subNode.loc.start.line, previousLine)
        ) {
            stateVariableDeclarationBlock.push(subNode as StateVariableDeclaration);
            previousLine = subNode.loc.end.line;
        } else {
            if (stateVariableDeclarationBlock.length) {
                stateVariableDeclarationBlocks.push(stateVariableDeclarationBlock);
            }
            stateVariableDeclarationBlock = [];
            previousLine = null;
        }
    }
    if (stateVariableDeclarationBlock.length) {
        stateVariableDeclarationBlocks.push(stateVariableDeclarationBlock);
    }
    return stateVariableDeclarationBlocks;
}

export default getStateVariableDeclarationBlocks;
