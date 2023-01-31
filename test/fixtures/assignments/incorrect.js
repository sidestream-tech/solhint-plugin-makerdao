const unalignedAssignments = `
    uint256 a = 12;
    uint    b =  12;
`;

const multipleBlocksUnalignedAssignments = `
    uint256 a = 12;
    uint    b =  12;
    function f() {}
    uint256 c = 12;
    uint    d = 12;
`;

module.exports = { unalignedAssignments, multipleBlocksUnalignedAssignments };
