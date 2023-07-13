"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unalignedCommentsMultiBlock = exports.unalignedComments = void 0;
exports.unalignedComments = `
    uint256 a; // this is a comment,
    uint b; // this is another comment
`;
exports.unalignedCommentsMultiBlock = `
    uint256 a; // unaligned
    uint b; // unaligned

    uint256 c; // aligned
    uint d;    // aligned

    uint256 e; // unaligned
    uint f; // unaligned
`;
exports.default = {
    unalignedComments: exports.unalignedComments,
    unalignedCommentsMultiBlock: exports.unalignedCommentsMultiBlock,
};
