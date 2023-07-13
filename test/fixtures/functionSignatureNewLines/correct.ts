export const noNewlinesBetweenSignatures = `
function a() public;
function b() public;
`;

export const newlinesBetweenFunctions = `
function a() public {
    return 1;
}

function b() public {
    return 1;
}
`;

export default {
    noNewlinesBetweenSignatures,
    newlinesBetweenFunctions,
}
