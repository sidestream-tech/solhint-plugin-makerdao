const { multiLine } = require('solhint/test/common/contract-builder');

module.exports = multiLine('uint256 a; // this is a comment', '        uint b;    // this is another comment');
