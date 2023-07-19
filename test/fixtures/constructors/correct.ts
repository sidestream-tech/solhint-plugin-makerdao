export const suffixedArgs = `
    constructor(uint a_) {
        this.a = a_;
    }
`;

export const prefixedArgs = `
    constructor(uint _a) {
        this.a = _a;
    }
`;

export default {
    suffixedArgs,
    prefixedArgs,
};
