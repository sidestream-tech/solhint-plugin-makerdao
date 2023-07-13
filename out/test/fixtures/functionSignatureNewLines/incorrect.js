"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newlinesBetweenSignatures = void 0;
exports.newlinesBetweenSignatures = `
function a() public;

function b() public;
function c() public;
function d() {
    return 1;
}
`;
exports.default = {
    newlinesBetweenSignatures: exports.newlinesBetweenSignatures,
};
