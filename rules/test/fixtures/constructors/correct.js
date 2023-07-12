"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefixedArgs = exports.suffixedArgs = void 0;
exports.suffixedArgs = `
    constructor(uint a_) {
        this.a = a_;
    }
`;
exports.prefixedArgs = `
    constructor(uint _a) {
        this.a = _a;
    }
`;
