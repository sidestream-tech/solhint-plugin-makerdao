"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newlinesBetweenFunctions = exports.noNewlinesBetweenSignatures = void 0;
exports.noNewlinesBetweenSignatures = `
function a() public;
function b() public;
`;
exports.newlinesBetweenFunctions = `
function a() public {
    return 1;
}

function b() public {
    return 1;
}
`;
exports.default = {
    noNewlinesBetweenSignatures: exports.noNewlinesBetweenSignatures,
    newlinesBetweenFunctions: exports.newlinesBetweenFunctions,
};
