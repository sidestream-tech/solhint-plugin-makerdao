"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerticallyAlignedVisibilityModifiers = exports.meta = void 0;
const getStateVariableDeclarationBlocks_1 = require("./utils/getStateVariableDeclarationBlocks");
const getMaxArrayValueOrNull_1 = require("./utils/getMaxArrayValueOrNull");
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
exports.meta = {
    ruleId: 'vertically-aligned-state-var-visibility',
    type: 'miscellaneous',
    docs: {
        description: 'Check that declarations of contract variables have their visibility modifiers aligned vertically.',
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
    const typeNameEndLocations = stateVariableDeclarationBlock
        .map(node => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (((_b = (_a = node.variables[0].typeName) === null || _a === void 0 ? void 0 : _a.loc) === null || _b === void 0 ? void 0 : _b.end.line) === undefined ||
            ((_d = (_c = node.variables[0].identifier) === null || _c === void 0 ? void 0 : _c.loc) === null || _d === void 0 ? void 0 : _d.start.line) === undefined) {
            return undefined;
        }
        return {
            lines: [(_f = (_e = node.variables[0].typeName) === null || _e === void 0 ? void 0 : _e.loc) === null || _f === void 0 ? void 0 : _f.end.line, (_h = (_g = node.variables[0].identifier) === null || _g === void 0 ? void 0 : _g.loc) === null || _h === void 0 ? void 0 : _h.start.line],
            visibilityModifier: node.variables[0].visibility,
        };
    })
        .filter((value) => value !== undefined);
    const visibilityModifierLocations = typeNameEndLocations.map(loc => {
        const { lines, visibilityModifier } = loc;
        if (visibilityModifier === 'default') {
            return null;
        }
        return { visibilityModifier, lines };
    });
    return visibilityModifierLocations;
}
function getIndexOfVisibilityModifier(line, visibilityModifier) {
    if (visibilityModifier === undefined) {
        return null;
    }
    // eslint-disable-next-line no-useless-escape
    const re = new RegExp(`($|(\s)*)${visibilityModifier}($|(\s)*)`, 'g');
    const match = re.exec(line);
    if (match) {
        return match.index + match[0].indexOf(visibilityModifier);
    }
    return null;
}
function getVariableVisibilityModifierColumnsPerBlock(visibilityModifierLocations, inputSrc) {
    const mapped = visibilityModifierLocations.map(modifier => {
        if (modifier === null) {
            return null;
        }
        const { visibilityModifier, lines } = modifier;
        const [startLine, endLine] = lines;
        const linesOfCode = inputSrc.split(lineBreakPattern).slice(startLine - 1, endLine);
        const columnLocationsOfModifier = linesOfCode.map(line => getIndexOfVisibilityModifier(line, visibilityModifier));
        return columnLocationsOfModifier.find((column) => column !== null) || null;
    });
    return mapped.filter((value) => value !== null);
}
function validateVerticalVisibilityAlignments(stateVariableDeclarationBlocks, ctx, inputSrc) {
    const errors = [];
    for (const block of stateVariableDeclarationBlocks) {
        const locations = getVariableVisibilityModifierLocations(block);
        const columns = getVariableVisibilityModifierColumnsPerBlock(locations, inputSrc);
        const maxAlignment = (0, getMaxArrayValueOrNull_1.default)(columns);
        if (maxAlignment === null) {
            return [];
        }
        columns.forEach((col, idx) => {
            if (col !== maxAlignment) {
                errors.push(Object.assign(Object.assign({}, ctx), { loc: block[idx].loc }));
            }
        });
    }
    return errors;
}
class VerticallyAlignedVisibilityModifiers {
    constructor(reporter, _config, inputSrc) {
        this.ruleId = exports.meta.ruleId;
        this.reporter = reporter;
        this.inputSrc = inputSrc;
        this.meta = exports.meta;
    }
    ContractDefinition(ctx) {
        const stateVariableDeclarationBlocks = (0, getStateVariableDeclarationBlocks_1.default)(ctx);
        const errors = validateVerticalVisibilityAlignments(stateVariableDeclarationBlocks, ctx, this.inputSrc);
        errors.forEach(error => this.reporter.error(error, this.ruleId, 'State variable visibility modifiers should be aligned'));
    }
}
exports.VerticallyAlignedVisibilityModifiers = VerticallyAlignedVisibilityModifiers;
exports.default = { VerticallyAlignedVisibilityModifiers, meta: exports.meta };
