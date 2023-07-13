export function isDeclarationFirstInBlock(startLineNum: any, previousLineNumOrNull: any) {
    return startLineNum === previousLineNumOrNull + 1 || previousLineNumOrNull === null;
}
export function getStateVariableDeclarationBlocks(ctx: any) {
    const stateVariableDeclarationBlocks = [];
    let stateVariableDeclarationBlock = [];
    let previousLine = null;
    for (const subNode of ctx.subNodes) {
        if (
            subNode.type === 'StateVariableDeclaration' &&
            isDeclarationFirstInBlock(subNode.loc.start.line, previousLine)
        ) {
            stateVariableDeclarationBlock.push(subNode);
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
