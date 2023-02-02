const suffixedArgs = `
    constructor(uint a_) {
        this.a = a_;
    }
`;

const prefixedArgs = `
    constructor(uint _a) {
        this.a = _a;
    }
`;

module.exports = { suffixedArgs, prefixedArgs };
