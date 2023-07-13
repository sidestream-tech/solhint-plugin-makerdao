"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alignedCommentsMultiBlock = exports.alignedComments = void 0;
exports.alignedComments = `
    uint256 a; // this is a comment
    uint b;    // this is another comment
`;
exports.alignedCommentsMultiBlock = `
    uint256 a; // this is a comment
    uint b;    // this is another comment

    uint256 c; // this is a comment
    uint d;    // this is another comment

    uint256 e; // this is a comment
    uint f;    // this is another comment
`;
exports.default = {
    alignedComments: exports.alignedComments,
    alignedCommentsMultiBlock: exports.alignedCommentsMultiBlock,
};
