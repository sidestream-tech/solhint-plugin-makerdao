const lineBreakPattern = /\r\n|[\r\n\u2028\u2029]/u;

function isDeclarationFirstInBlock(startLineNum, previousLineNumOrNull) {
    return startLineNum === previousLineNumOrNull + 1 || previousLineNumOrNull === null;
}

function getStateVariableDeclarationBlocks(ctx) {
    const stateVariableDeclarationBlocks = [];
    let stateVariableDeclarationBlock = [];
    let previousLine = null;
    for (const subNode of ctx.subNodes) {
        if (
            subNode.type === 'StateVariableDeclaration' &&
            !subNode.initialValue &&
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
function validateVerticalDeclarationAlignments(stateVariableDeclarationBlocks, ctx) {
    const errors = [];
    for (const block of stateVariableDeclarationBlocks) {
        const alignments = block.map(node => node.variables[0].identifier.loc.start.column);
        const maxAlignment = Math.max(...alignments);
        alignments.forEach((alignment, idx) => {
            if (alignment !== maxAlignment) {
                errors.push({ ...ctx, loc: block[idx].loc });
            }
        });
    }
    return errors;
}
class VerticallyAlignedDeclarations {
    constructor(reporter, config, inputSrc, fileName) {
        this.ruleId = 'vertically-aligned-declarations';
        this.reporter = reporter;
        this.config = config;
        this.inputSrc = inputSrc;
        this.fileName = fileName;
    }
    ContractDefinition(ctx) {
        const stateVariableDeclarationBlocks = getStateVariableDeclarationBlocks(ctx);
        const errors = validateVerticalDeclarationAlignments(stateVariableDeclarationBlocks, ctx);
        errors.forEach(error =>
            this.reporter.error(error, this.ruleId, 'State variable declarations should be aligned')
        );
    }
}

module.exports = { VerticallyAlignedDeclarations };
