const { VerticallyAlignedComments } = require('./out/rules/vertically-aligned-comments');
const { VerticallyAlignedDeclarations } = require('./out/rules/vertically-aligned-declarations');
const { VerticallyAlignedVisibilityModifiers } = require('./out/rules/vertically-aligned-state-var-visibility');
const { VerticallyAlignedAssignments } = require('./out/rules/vertically-aligned-assignments');
const { NoNewlinesBetweenFunctionSignatures } = require('./out/rules/no-newlines-between-function-signatures');
const { UnderscoredConstructorArguments } = require('./out/rules/constructor-arguments-unserscored');
const { PreferTypeProvidedMax } = require('./out/rules/prefer-type-provided-max');
const { CapitalizedSnakeOnlyForConst } = require('./out/rules/capitalized-snake-only-for-const');
const {
    NewlinesBetweenCustomAndNativeDeclarations,
} = require('./out/rules/newlines-between-custom-and-native-declarations');

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
