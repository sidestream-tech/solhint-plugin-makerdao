const getStateVariableDeclarationBlocks = require('./utils/getStateVariableDeclarationBlocks');
const goodCode = `
pragma solidity 0.4.4;


contract C {
    uint256 public a;
    uint    public b;
}
`;
const badCode = `
pragma solidity 0.4.4;


contract C {
    uint256 public a;
    uint public    b;
}
`;

const lineBreakPattern = /\r\n|[\r\n\u2028\u2029]/u;

const meta = {
    ruleId: 'vertically-aligned-state-var-visibility',
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
        if (columns.every(column => column === null)) {
            return [];
        }
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
    constructor(reporter, _config, inputSrc) {
        this.ruleId = meta.ruleId;
        this.reporter = reporter;
        this.inputSrc = inputSrc;
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

module.exports = { VerticallyAlignedVisibilityModifiers, meta };
