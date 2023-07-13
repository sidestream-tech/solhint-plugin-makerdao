"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multipleBlocksUnalignedAssignments = exports.unalignedAssignments = void 0;
exports.unalignedAssignments = `
    uint256 a = 12;
    uint    b =  12;
`;
exports.multipleBlocksUnalignedAssignments = `
    uint256 a = 12;
    uint    b =  12;
    function f() {}
    uint256 c = 12;
    uint    d = 12;
`;
exports.default = { unalignedAssignments: exports.unalignedAssignments, multipleBlocksUnalignedAssignments: exports.multipleBlocksUnalignedAssignments };
