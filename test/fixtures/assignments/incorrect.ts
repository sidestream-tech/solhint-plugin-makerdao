export const unalignedAssignments = `
    uint256 a = 12;
    uint    b =  12;
`;

export const multipleBlocksUnalignedAssignments = `
    uint256 a = 12;
    uint    b =  12;
    function f() {}
    uint256 c = 12;
    uint    d = 12;
`;

export default {unalignedAssignments, multipleBlocksUnalignedAssignments}
