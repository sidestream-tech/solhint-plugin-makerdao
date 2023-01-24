const { multiLine } = require('solhint/test/common/contract-builder');

module.exports = multiLine('uint256 a;', '        uint    b;');
