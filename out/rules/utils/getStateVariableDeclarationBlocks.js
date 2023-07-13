"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStateVariableDeclarationBlocks = exports.isDeclarationFirstInBlock = void 0;
function isDeclarationFirstInBlock(startLineNum, previousLineNumOrNull) {
    return startLineNum === previousLineNumOrNull + 1 || previousLineNumOrNull === null;
}
exports.isDeclarationFirstInBlock = isDeclarationFirstInBlock;
function getStateVariableDeclarationBlocks(ctx) {
    const stateVariableDeclarationBlocks = [];
    let stateVariableDeclarationBlock = [];
    let previousLine = null;
    for (const subNode of ctx.subNodes) {
        if (subNode.type === 'StateVariableDeclaration' &&
            isDeclarationFirstInBlock(subNode.loc.start.line, previousLine)) {
            stateVariableDeclarationBlock.push(subNode);
            previousLine = subNode.loc.end.line;
        }
        else {
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
exports.getStateVariableDeclarationBlocks = getStateVariableDeclarationBlocks;
exports.default = getStateVariableDeclarationBlocks;
