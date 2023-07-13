"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.missingNewlinesBetweenCustomAndNativeDeclarations = exports.unalignedVisibilityModifiers = exports.unalignedMultiLineVisibilityModifiers = exports.unalignedDeclarationsMultipleBlocks = exports.unalignedDeclarations = void 0;
exports.unalignedDeclarations = `
    uint256 a;
    uint   b;
`;
exports.unalignedDeclarationsMultipleBlocks = `
    uint256 a;
    uint   b;
    function f() {}
    uint256 c;
    uint    d;
    function ff() {}
    uint256 e;
    uint   f;
`;
exports.unalignedMultiLineVisibilityModifiers = `
    uint256 public a;
    uint    public b;
    uint256
    public c;
    uint    public d;
`;
exports.unalignedVisibilityModifiers = `
    uint256 public a;
    uint   public b;
`;
exports.missingNewlinesBetweenCustomAndNativeDeclarations = `
    interface customInterface {
        function f() external;
    }
    contract C {
        uint256 public a;
        cutomInterface public item;
    }
`;
exports.default = {
    unalignedDeclarations: exports.unalignedDeclarations,
    unalignedDeclarationsMultipleBlocks: exports.unalignedDeclarationsMultipleBlocks,
    unalignedMultiLineVisibilityModifiers: exports.unalignedMultiLineVisibilityModifiers,
    unalignedVisibilityModifiers: exports.unalignedVisibilityModifiers,
    missingNewlinesBetweenCustomAndNativeDeclarations: exports.missingNewlinesBetweenCustomAndNativeDeclarations,
};
