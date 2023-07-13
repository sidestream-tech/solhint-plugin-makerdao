"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newlinesBetweenCustomAndNativeDeclarations = exports.singleVisivilityModifiers = exports.alignedVisivilityModifiers = exports.alignedMultiLineDeclarationsMultiple = exports.alignedDeclarations = void 0;
exports.alignedDeclarations = `
    uint256 a;
    uint    b = 23;
`;
exports.alignedMultiLineDeclarationsMultiple = `
    uint256 public a;
    uint    public b;
    uint256
            public c;
    uint    public d;
`;
exports.alignedVisivilityModifiers = `
    uint256 public a;
    uint    public b;
`;
exports.singleVisivilityModifiers = `
    uint256 constant a = 2;
`;
exports.newlinesBetweenCustomAndNativeDeclarations = `
    uint256 public a;

    cutomInterface public item;
`;
exports.default = {
    alignedDeclarations: exports.alignedDeclarations,
    alignedMultiLineDeclarationsMultiple: exports.alignedMultiLineDeclarationsMultiple,
    alignedVisivilityModifiers: exports.alignedVisivilityModifiers,
    singleVisivilityModifiers: exports.singleVisivilityModifiers,
    newlinesBetweenCustomAndNativeDeclarations: exports.newlinesBetweenCustomAndNativeDeclarations,
};
