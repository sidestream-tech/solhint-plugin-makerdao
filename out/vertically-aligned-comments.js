"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerticallyAlignedComments = exports.meta = void 0;
const goodCode = `
pragma solidity 0.4.4;


contract C {
    uint256 a; // comments
    uint256 b; // comments
}
`;
const badCode = `
pragma solidity 0.4.4;


contract C {
    uint256 abc; // comments
    uint256 pi; // comments
}
`;
exports.meta = {
    ruleId: 'vertically-aligned-comments',
    type: 'miscellaneous',
    docs: {
        description: 'Check that comments of the block start on the same column.',
        category: 'Miscellaneous',
        examples: {
            good: [
                {
                    description: 'All comments start on the same column',
                    code: goodCode,
                },
            ],
            bad: [
                {
                    description: 'Not all comments start on the same column',
                    code: badCode,
                },
            ],
        },
    },
    isDefault: false,
    recommended: false,
    defaultSetup: 'warn',
    schema: null,
};
const lineBreakPattern = /\r\n|[\r\n\u2028\u2029]/u;
const commentPattern = /.*\/\/.*/;
function getCommentGroupStartIndices(comments) {
    const commentGroupStartIndices = [];
    for (let i = 0; i < comments.length; i += 1) {
        const comment = comments[i];
        const previousComment = comments[i - 1];
        if (!previousComment || comment.index - previousComment.index > 1) {
            commentGroupStartIndices.push(i);
        }
    }
    return commentGroupStartIndices;
}
function validateVerticalAlignment(commentGroupStartIndices, comments, ctx) {
    const reportedErrors = [];
    for (let i = 0; i < commentGroupStartIndices.length; i += 1) {
        const commentGroup = comments.slice(commentGroupStartIndices[i], commentGroupStartIndices[i + 1] || undefined);
        const commentGroupMaxStartColumn = Math.max(...commentGroup.map(({ line }) => line.indexOf('//')));
        commentGroup.forEach(({ line, index }) => {
            const startColumn = line.indexOf('//');
            if (startColumn !== commentGroupMaxStartColumn) {
                const updatedCtx = Object.assign(Object.assign({}, ctx), { loc: { start: { line: index + 1, column: startColumn + 1 } } });
                reportedErrors.push(updatedCtx);
            }
        });
    }
    return reportedErrors;
}
class VerticallyAlignedComments {
    constructor(reporter, _config, inputSrc) {
        this.ruleId = exports.meta.ruleId;
        this.reporter = reporter;
        this.inputSrc = inputSrc;
        this.meta = exports.meta;
    }
    SourceUnit(ctx) {
        const lines = this.inputSrc.split(lineBreakPattern);
        const comments = lines.map((line, index) => ({ line, index })).filter(({ line }) => commentPattern.test(line));
        const commentGroupStartIndices = getCommentGroupStartIndices(comments);
        const reportedErrors = validateVerticalAlignment(commentGroupStartIndices, comments, ctx);
        reportedErrors.forEach(updatedContext => {
            this.reporter.error(updatedContext, this.ruleId, 'Comments should be vertically aligned.');
        });
    }
}
exports.VerticallyAlignedComments = VerticallyAlignedComments;
exports.default = { VerticallyAlignedComments, meta: exports.meta };
