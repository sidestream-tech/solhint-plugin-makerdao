const unalignedDeclarations = `
    uint256 a;
    uint   b;
`;
const unalignedDeclarationsMultipleBlocks = `
    uint256 a;
    uint   b;
    function f() {}
    uint256 c;
    uint    d;
    function ff() {}
    uint256 e;
    uint   f;
`;
const unalignedMultiLineVisibilityModifiers = `
    uint256 public a;
    uint    public b;
    uint256
    public c;
    uint    public d;
`;
const unalignedVisibilityModifiers = `
    uint256 public a;
    uint   public b;
`;

const missingNewlinesBetweenCustomAndNativeDeclarations = `
    interface customInterface {
        function f() external;
    }
    contract C {
        uint256 public a;
        cutomInterface public item;
    }
`;

module.exports = {
    unalignedDeclarations,
    unalignedDeclarationsMultipleBlocks,
    unalignedMultiLineVisibilityModifiers,
    unalignedVisibilityModifiers,
    missingNewlinesBetweenCustomAndNativeDeclarations,
};
