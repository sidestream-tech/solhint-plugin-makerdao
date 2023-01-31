const noNewlinesBetweenSignatures = `
function a() public;
function b() public;
`;

const newlinesBetweenFunctions = `
function a() public {
    return 1;
}

function b() public {
    return 1;
}
`;

module.exports = { noNewlinesBetweenSignatures, newlinesBetweenFunctions };
