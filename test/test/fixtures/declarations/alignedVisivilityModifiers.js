const { multiLine } = require('solhint/test/common/contract-builder');

module.exports = multiLine('uint256 public a;', '        uint    public b;');
