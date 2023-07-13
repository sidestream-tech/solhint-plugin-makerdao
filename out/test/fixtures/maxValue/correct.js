"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeProvidedMax = void 0;
exports.typeProvidedMax = `
    uint256 a = type(uint256).max;
    uint32 b = type(uint32).max;
    uint16 c = type(uint16).max;
    uint8 d = type(uint8).max;
    uint e = type(uint).max;
`;
exports.default = {
    typeProvidedMax: exports.typeProvidedMax,
};
