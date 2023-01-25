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

module.exports = { alignedDeclarations, alignedMultiLineDeclarationsMultiple, alignedVisivilityModifiers };
