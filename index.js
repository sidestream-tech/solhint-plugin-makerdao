const { VerticallyAlignedComments } = require('./rules/vertically-aligned-comments');
const { VerticallyAlignedDeclarations } = require('./rules/vertically-aligned-declarations');
const { VerticallyAlignedVisibilityModifiers } = require('./rules/vertically-aligned-state-var-visibility');

module.exports = [VerticallyAlignedComments, VerticallyAlignedDeclarations, VerticallyAlignedVisibilityModifiers];
