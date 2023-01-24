const lineBreakPattern = /\r\n|[\r\n\u2028\u2029]/u;
const commentPattern = /.*\/\/.*/;
class VerticallyAlignedComments {
  constructor(reporter, config, inputSrc, fileName) {
    this.ruleId = "vertically-aligned-comments";
    this.reporter = reporter;
    this.config = config;
    this.inputSrc = inputSrc;
    this.fileName = fileName;
  }
  SourceUnit(ctx) {
    const lines = this.inputSrc.split(lineBreakPattern);
    const comments = lines
      .map((line, index) => ({ line, index }))
      .filter(({ line }) => commentPattern.test(line));
    // get comment group start ineices
    const commentGroupStartIndices = [];
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      const previousComment = comments[i - 1];
      if (!previousComment || comment.index - previousComment.index > 1) {
        commentGroupStartIndices.push(i);
      }
    }

    // make sure comment groups are vertically aligned
    for (let i = 0; i < commentGroupStartIndices.length; i++) {
      const commentGroup = comments.slice(
        commentGroupStartIndices[i],
        commentGroupStartIndices[i + 1] || undefined
      );
      const commentGroupMaxStartColumn = Math.max(
        ...commentGroup.map(({ line }) => line.indexOf("//"))
      );
      commentGroup.forEach(({ line, index }) => {
        const startColumn = line.indexOf("//");
        if (startColumn !== commentGroupMaxStartColumn) {
          const updatedCtx = {
            ...ctx,
            loc: { start: { line: index + 1, column: startColumn + 1 } },
          };
          this.reporter.error(
            updatedCtx,
            this.ruleId,
            "Comments should be vertically aligned."
          );
        }
      });
    }
  }
}

module.exports = {VerticallyAlignedComments};
