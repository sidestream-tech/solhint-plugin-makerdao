export const unalignedDeclarations = `
    uint256 a;
    uint   b;
`;
export const unalignedDeclarationsMultipleBlocks = `
    uint256 a;
    uint   b;
    function f() {}
    uint256 c;
    uint    d;
    function ff() {}
    uint256 e;
    uint   f;
`;
export const unalignedMultiLineVisibilityModifiers = `
    uint256 public a;
    uint    public b;
    uint256
    public c;
    uint    public d;
`;
export const unalignedVisibilityModifiers = `
    uint256 public a;
    uint   public b;
`;
export const missingNewlinesBetweenCustomAndNativeDeclarations = `
    interface customInterface {
        function f() external;
    }
    contract C {
        uint256 public a;
        cutomInterface public item;
    }
`;

export default {
    unalignedDeclarations,
    unalignedDeclarationsMultipleBlocks,
    unalignedMultiLineVisibilityModifiers,
    unalignedVisibilityModifiers,
    missingNewlinesBetweenCustomAndNativeDeclarations,
};
