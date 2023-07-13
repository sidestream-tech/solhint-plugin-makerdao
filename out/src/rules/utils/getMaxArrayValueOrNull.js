"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxArrayValueOrNull = void 0;
function getMaxArrayValueOrNull(array) {
    if (array.every(item => item === null)) {
        return null;
    }
    return Math.max(...array);
}
exports.getMaxArrayValueOrNull = getMaxArrayValueOrNull;
exports.default = getMaxArrayValueOrNull;
