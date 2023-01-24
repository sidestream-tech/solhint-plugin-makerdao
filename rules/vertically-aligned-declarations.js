const lineBreakPattern = /\r\n|[\r\n\u2028\u2029]/u;

class VerticallyAlignedDeclarations {
    constructor(reporter, config, inputSrc, fileName) {
        this.ruleId = 'vertically-aligned-declarations';
        this.reporter = reporter;
        this.config = config;
        this.inputSrc = inputSrc;
        this.fileName = fileName;
    }
    ContractDefinition(ctx) {
        const stateVariableDeclarationBlocks = [];
        let stateVariableDeclarationBlock = [];
        let previousLine = null;
        for (let subNode of ctx.subNodes) {
            if (
                subNode.type === 'StateVariableDeclaration' &&
                !subNode.initialValue &&
                (subNode.loc.start.line === previousLine + 1 || previousLine === null)
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
        for (let block of stateVariableDeclarationBlocks) {
            const alignments = block.map(node => node.variables[0].identifier.loc.start.column);
            const maxAlignment = Math.max(...alignments);
            alignments.forEach((alignment, idx) => {
                if (alignment !== maxAlignment) {
                    this.reporter.error(
                        { ...ctx, loc: block[idx].loc },
                        this.ruleId,
                        'State variable declarations should be aligned'
                    );
                }
            });
        }
    }
}

module.exports = { VerticallyAlignedDeclarations };
