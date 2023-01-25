const goodCode = `
contract C {
    uint256 public a;
    uint    public b;
};
`;
const badCode = `
contract C {
    uint256 public a;
    uint public    b;
};
`;

const lineBreakPattern = /\r\n|[\r\n\u2028\u2029]/u;

const meta = {
    type: 'miscellaneous',

    docs: {
        description:
            'Check that declarations of contract variables have their visibility modifiers aligned vertically.',
        category: 'Miscellaneous',
        examples: {
            good: [
                {
                    description: 'All visibility modifiers start on the same column',
                    code: goodCode,
                },
            ],
            bad: [
                {
                    description: 'Not all visibility modifiers start on the same column',
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

function getVariableVisibilityModifierLocations(stateVariableDeclarationBlock) {
    const typeNameEndLocations = stateVariableDeclarationBlock.map(node => ({
        lines: [node.variables[0].typeName.loc.end.line, node.variables[0].identifier.loc.start.line],
        visibilityModifier: node.variables[0].visibility,
    }));
    const visibilityModifierLocations = typeNameEndLocations.map(({ lines, visibilityModifier }) => {
        if (visibilityModifier === 'default') {
            return null;
        }
        return { visibilityModifier, lines };
    });
    return visibilityModifierLocations;
}

function getIndexOfVisibilityModifier(line, visibilityModifier) {
    const re = new RegExp(`($|(\s)*)${visibilityModifier}($|(\s)*)`, 'g');
    const match = re.exec(line);
    if (match) {
        return match.index + match[0].indexOf(visibilityModifier);
    }
    return null;
}

function getVariableVisibilityModifierColumnsPerBlock(visibilityModifierLocations, inputSrc) {
    const ret = visibilityModifierLocations.map(modifier => {
        if (modifier === null) {
            return null;
        }
        const { visibilityModifier, lines } = modifier;
        const [startLine, endLine] = lines;
        const linesOfCode = inputSrc.split(lineBreakPattern).slice(startLine - 1, endLine);
        const columnLocationsOfModifier = linesOfCode.map(line =>
            getIndexOfVisibilityModifier(line, visibilityModifier)
        );

        return columnLocationsOfModifier.find(column => column !== null);
    });
    return ret;
}

function validateVerticalVisibilityAlignments(stateVariableDeclarationBlocks, ctx, inputSrc) {
    const errors = [];
    for (const block of stateVariableDeclarationBlocks) {
        const locations = getVariableVisibilityModifierLocations(block);
        const columns = getVariableVisibilityModifierColumnsPerBlock(locations, inputSrc);
        const maxAlignment = Math.max(...columns);
        columns.forEach((col, idx) => {
            if (col !== maxAlignment) {
                errors.push({ ...ctx, loc: block[idx].loc });
            }
        });
    }
    return errors;
}
class VerticallyAlignedVisibilityModifiers {
    constructor(reporter, config, inputSrc, fileName) {
        this.ruleId = 'vertically-aligned-state-var-visibility';
        this.reporter = reporter;
        this.config = config;
        this.inputSrc = inputSrc;
        this.fileName = fileName;
        this.meta = meta;
    }
    ContractDefinition(ctx) {
        const stateVariableDeclarationBlocks = getStateVariableDeclarationBlocks(ctx);
        const errors = validateVerticalVisibilityAlignments(stateVariableDeclarationBlocks, ctx, this.inputSrc);
        errors.forEach(error =>
            this.reporter.error(error, this.ruleId, 'State variable visibility modifiers should be aligned')
        );
    }
}

module.exports = { VerticallyAlignedVisibilityModifiers };
