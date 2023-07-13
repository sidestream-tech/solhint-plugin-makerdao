export const alignedDeclarations = `
    uint256 a;
    uint    b = 23;
`;

export const alignedMultiLineDeclarationsMultiple = `
    uint256 public a;
    uint    public b;
    uint256
            public c;
    uint    public d;
`;

export const alignedVisivilityModifiers = `
    uint256 public a;
    uint    public b;
`;

export const singleVisivilityModifiers = `
    uint256 constant a = 2;
`;

export const newlinesBetweenCustomAndNativeDeclarations = `
    uint256 public a;

    cutomInterface public item;
`;

export default {
    alignedDeclarations,
    alignedMultiLineDeclarationsMultiple,
    alignedVisivilityModifiers,
    singleVisivilityModifiers,
    newlinesBetweenCustomAndNativeDeclarations,
}
