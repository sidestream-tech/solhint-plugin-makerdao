const { VerticallyAlignedComments } = require('./rules/vertically-aligned-comments');
const { VerticallyAlignedDeclarations } = require('./rules/vertically-aligned-declarations');
const { VerticallyAlignedVisibilityModifiers } = require('./rules/vertically-aligned-state-var-visibility');
const { VerticallyAlignedAssignments } = require('./rules/vertically-aligned-assignments');
const { NoNewlinesBetweenFunctionSignatures } = require('./rules/no-newlines-between-function-signatures');
const { UnderscoredConstructorArguments } = require('./rules/constructor-arguments-unserscored');
const { PreferTypeProvidedMax } = require('./rules/prefer-type-provided-max');
const { CapitalizedSnakeOnlyForConst } = require('./rules/capitalized-snake-only-for-const');
const {
    NewlinesBetweenCustomAndNativeDeclarations,
} = require('./rules/newlines-between-custom-and-native-declarations');

module.exports = [
    VerticallyAlignedComments,
    VerticallyAlignedDeclarations,
    VerticallyAlignedVisibilityModifiers,
    VerticallyAlignedAssignments,
    NoNewlinesBetweenFunctionSignatures,
    UnderscoredConstructorArguments,
    PreferTypeProvidedMax,
    CapitalizedSnakeOnlyForConst,
    NewlinesBetweenCustomAndNativeDeclarations,
];
