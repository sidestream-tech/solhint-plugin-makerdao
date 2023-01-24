const { multiLine } = require('solhint/test/common/contract-builder');

module.exports = multiLine(
    'uint256 a;',
    '        uint   b;',
    '        function f() {}',
    '        uint256 c;',
    '        uint    d;',
    '        function ff() {}',
    '        uint256 e;',
    '        uint   f;'
);
