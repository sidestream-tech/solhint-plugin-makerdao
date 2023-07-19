export const unalignedComments = `
    uint256 a; // this is a comment,
    uint b; // this is another comment
`;

export const unalignedCommentsMultiBlock = `
    uint256 a; // unaligned
    uint b; // unaligned

    uint256 c; // aligned
    uint d;    // aligned

    uint256 e; // unaligned
    uint f; // unaligned
`;

export default {
    unalignedComments,
    unalignedCommentsMultiBlock,
};
