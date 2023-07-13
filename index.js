const { VerticallyAlignedComments } = require('./out/vertically-aligned-comments');
const { VerticallyAlignedDeclarations } = require('./out/vertically-aligned-declarations');
const { VerticallyAlignedVisibilityModifiers } = require('./out/vertically-aligned-state-var-visibility');
const { VerticallyAlignedAssignments } = require('./out/vertically-aligned-assignments');
const { NoNewlinesBetweenFunctionSignatures } = require('./out/no-newlines-between-function-signatures');
const { UnderscoredConstructorArguments } = require('./out/constructor-arguments-unserscored');
const { PreferTypeProvidedMax } = require('./out/prefer-type-provided-max');
const { CapitalizedSnakeOnlyForConst } = require('./out/capitalized-snake-only-for-const');
const {
    NewlinesBetweenCustomAndNativeDeclarations,
} = require('./out/newlines-between-custom-and-native-declarations');

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
