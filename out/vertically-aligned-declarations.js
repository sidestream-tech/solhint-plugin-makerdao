"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerticallyAlignedDeclarations = exports.meta = void 0;
const getStateVariableDeclarationBlocks_1 = require("./utils/getStateVariableDeclarationBlocks");
const getMaxArrayValueOrNull_1 = require("./utils/getMaxArrayValueOrNull");
const goodCode = `
pragma solidity 0.4.4;


contract C {
    uint256 public a;
    uint256 public b;
}
`;
const badCode = `
pragma solidity 0.4.4;


contract C {
    uint256 public a;
    uint public b;
}
`;
exports.meta = {
    ruleId: 'vertically-aligned-declarations',
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
function validateVerticalDeclarationAlignments(stateVariableDeclarationBlocks, ctx) {
    const errors = [];
    for (const block of stateVariableDeclarationBlocks) {
        const alignments = block.map(node => node.variables[0].identifier.loc.start.column);
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
class VerticallyAlignedDeclarations {
    constructor(reporter) {
        this.ruleId = exports.meta.ruleId;
        this.reporter = reporter;
        this.meta = exports.meta;
    }
    ContractDefinition(ctx) {
        const stateVariableDeclarationBlocks = (0, getStateVariableDeclarationBlocks_1.default)(ctx);
        const errors = validateVerticalDeclarationAlignments(stateVariableDeclarationBlocks, ctx);
        errors.forEach(error => this.reporter.error(error, this.ruleId, 'State variable declarations should be aligned'));
    }
}
exports.VerticallyAlignedDeclarations = VerticallyAlignedDeclarations;
exports.default = { VerticallyAlignedDeclarations, meta: exports.meta };
