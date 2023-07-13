const { VerticallyAlignedComments } = require('./out/src/rules/vertically-aligned-comments');
const { VerticallyAlignedDeclarations } = require('./out/src/rules/vertically-aligned-declarations');
const { VerticallyAlignedVisibilityModifiers } = require('./out/src/rules/vertically-aligned-state-var-visibility');
const { VerticallyAlignedAssignments } = require('./out/src/rules/vertically-aligned-assignments');
const { NoNewlinesBetweenFunctionSignatures } = require('./out/src/rules/no-newlines-between-function-signatures');
const { UnderscoredConstructorArguments } = require('./out/src/rules/constructor-arguments-unserscored');
const { PreferTypeProvidedMax } = require('./out/src/rules/prefer-type-provided-max');
const { CapitalizedSnakeOnlyForConst } = require('./out/src/rules/capitalized-snake-only-for-const');
const {
    NewlinesBetweenCustomAndNativeDeclarations,
} = require('./out/src/rules/newlines-between-custom-and-native-declarations');

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
