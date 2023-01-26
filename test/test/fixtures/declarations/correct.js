const alignedDeclarations = `
    uint256 a;
    uint    b = 23;
`;

const alignedMultiLineDeclarationsMultiple = `
    uint256 public a;
    uint    public b;
    uint256
            public c;
    uint    public d;
`;

const alignedVisivilityModifiers = `
    uint256 public a;
    uint    public b;
`;

const newlinesBetweenCustomAndNativeDeclarations = `
    uint256 public a;

    cutomInterface public item;
`;

module.exports = {
    alignedDeclarations,
    alignedMultiLineDeclarationsMultiple,
    alignedVisivilityModifiers,
    newlinesBetweenCustomAndNativeDeclarations,
};
