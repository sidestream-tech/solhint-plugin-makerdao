"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerticallyAlignedAssignments = exports.meta = void 0;
const getStateVariableDeclarationBlocks_1 = require("./utils/getStateVariableDeclarationBlocks");
const getMaxArrayValueOrNull_1 = require("./utils/getMaxArrayValueOrNull");
const goodCode = `
pragma solidity 0.4.4;


contract C {
    uint256 public a = 33;
    uint256 public b = 1337;
}
`;
const badCode = `
pragma solidity 0.4.4;


contract C {
    uint256 public a = 12;
    uint    public b =  12;
}
`;
exports.meta = {
    ruleId: 'vertically-aligned-assignments',
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
function validateVerticalInitialValueAlignments(stateVariableDeclarationBlocks, ctx) {
    const errors = [];
    for (const block of stateVariableDeclarationBlocks) {
        const alignments = block
            .map(node => { var _a, _b; return (_b = (_a = node.variables[0].expression) === null || _a === void 0 ? void 0 : _a.loc) === null || _b === void 0 ? void 0 : _b.start.column; })
            .filter((alignment) => alignment !== undefined);
        const maxAlignment = (0, getMaxArrayValueOrNull_1.default)(alignments);
        if (maxAlignment === null) {
            return [];
        }
        alignments.forEach((alignment, idx) => {
            if (alignment !== maxAlignment) {
                errors.push(Object.assign(Object.assign({}, ctx), { loc: block[idx].loc }));
            }
        });
    }
    return errors;
}
class VerticallyAlignedAssignments {
    constructor(reporter) {
        this.ruleId = exports.meta.ruleId;
        this.reporter = reporter;
        this.meta = exports.meta;
    }
    ContractDefinition(ctx) {
        const stateVariableDeclarationBlocks = (0, getStateVariableDeclarationBlocks_1.default)(ctx);
        const errors = validateVerticalInitialValueAlignments(stateVariableDeclarationBlocks, ctx);
        errors.forEach(error => this.reporter.error(error, this.ruleId, 'State variable assignments should be aligned'));
    }
}
exports.VerticallyAlignedAssignments = VerticallyAlignedAssignments;
exports.default = { VerticallyAlignedAssignments, meta: exports.meta };
