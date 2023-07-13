"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMaxArrayValueOrNull(array) {
    if (array.every(item => item === null)) {
        return null;
    }
    return Math.max(...array);
}
exports.default = getMaxArrayValueOrNull;
