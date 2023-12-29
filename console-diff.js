/**
 * Here is an example of how to log text diffs to the console. Please make a function out of it.
 */
require('colors');
const Diff = require('diff');

module.exports = (text1, text2, ignoreSameLines = true) => {
  const diff = Diff.diffLines(text1, text2);
  if (!diff.length) {
    return;
  }
  const l = process.stderr
  diff.forEach((part) => {
    if (!part.value) {
      return;
    }
    if (ignoreSameLines && !part.added && !part.removed) {
      return;
    }
    // green for additions, red for deletions
    // grey for common parts
    const color = part.added ? 'green' :
      part.removed ? 'red' : 'grey';
    process.stderr.write(part.value[color]);
  });
  if (!process.stderr.length || l <= process.stderr.length) {
    return
  }
  console.log();
}