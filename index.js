const { VerticallyAlignedComments } = require('./rules/vertically-aligned-comments');
const { VerticallyAlignedDeclarations } = require('./rules/vertically-aligned-declarations');
const { VerticallyAlignedVisibilityModifiers } = require('./rules/vertically-aligned-state-var-visibility');
const { VerticallyAlignedAssignments } = require('./rules/vertically-aligned-assignments');
const { NoNewlinesBetweenFunctionSignatures } = require('./rules/no-newlines-between-function-signatures');

module.exports = [
    VerticallyAlignedComments,
    VerticallyAlignedDeclarations,
    VerticallyAlignedVisibilityModifiers,
    VerticallyAlignedAssignments,
    NoNewlinesBetweenFunctionSignatures,
];
