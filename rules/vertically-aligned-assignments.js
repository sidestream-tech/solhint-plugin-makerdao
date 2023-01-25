const goodCode = `
contract C {
    uint256 public a = 33;
    uint256 public b = 1337;
};
`;
const badCode = `
contract C {
    uint256 public a = 12;
    uint    public b =  12;
};
`;

const lineBreakPattern = /\r\n|[\r\n\u2028\u2029]/u;

const meta = {
    type: 'miscellaneous',

    docs: {
        description: 'Check that declarations of contract variables have their names aligned vertically.',
        category: 'Miscellaneous',
        examples: {
            good: [
                {
                    description: 'All names start on the same column',
                    code: goodCode,
                },
            ],
            bad: [
                {
                    description: 'Not all names start on the same column',
                    code: badCode,
                },
            ],
        },
    },

    isDefault: false,
    recommended: false,
    defaultSetup: 'warn',

    schema: null,
};

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
function validateVerticalInitialValueAlignments(stateVariableDeclarationBlocks, ctx) {
    const errors = [];
    for (const block of stateVariableDeclarationBlocks) {
        const alignments = block.map(node => node.variables[0].expression.loc.start.column);
        const maxAlignment = Math.max(...alignments);
        alignments.forEach((alignment, idx) => {
            if (alignment !== maxAlignment) {
                errors.push({ ...ctx, loc: block[idx].loc });
            }
        });
    }
    return errors;
}
class VerticallyAlignedAssignments {
    constructor(reporter, config, inputSrc, fileName) {
        this.ruleId = 'vertically-aligned-assignments';
        this.reporter = reporter;
        this.config = config;
        this.inputSrc = inputSrc;
        this.fileName = fileName;
        this.meta = meta;
    }
    ContractDefinition(ctx) {
        const stateVariableDeclarationBlocks = getStateVariableDeclarationBlocks(ctx);
        const errors = validateVerticalInitialValueAlignments(stateVariableDeclarationBlocks, ctx);
        errors.forEach(error =>
            this.reporter.error(error, this.ruleId, 'State variable assignments should be aligned')
        );
    }
}

module.exports = { VerticallyAlignedAssignments };
