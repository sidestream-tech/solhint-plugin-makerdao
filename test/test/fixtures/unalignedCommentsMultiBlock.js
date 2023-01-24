const { multiLine } = require('solhint/test/common/contract-builder');

module.exports = multiLine(
    'uint256 a; // unaligned',
    'uint b; // unaligned',
    '',
    '        uint256 c; // aligned',
    '        uint d;    // aligned',
    '',
    'uint256 e; // unaligned',
    'uint f; // unaligned',
)
