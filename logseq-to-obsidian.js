const fs = require("fs");
// const logDiff = require("./console-diff");

const idToPath = {}

// Loop through each file in this directory
fs.readdirSync("./").forEach((file) => {
  if (!file.endsWith(".md")) return;

  // find all instances of block IDs
  const fileContents = fs.readFileSync(file, "utf8");
  const matches = fileContents.matchAll(/[\s\n-]*id:: (.*)/g);
  for (const match of matches) {
    const id = match[1];
    idToPath[id] = file;
  }

  // then replace the matches with citations in the style ^$1
  const newFileContents = fileContents.replace(
    /[\b\s\n-]*id:: (.*)/g,
    " ^$1"
  );

  // then write the new file
  fs.writeFileSync(file, newFileContents, "utf8");
  // logDiff(fileContents, newFileContents)
})

/**
 * Then search for all logseq embeds, matching these two patterns:
 * - ((634403fd-273a-4a14-a768-f2af37ab9e0c))
 * - {{embed ((6343f721-23dc-4554-95dc-66118542a7ca))}}
 * And replace with the Obsidian embed syntax: ![[PATH_NAME#^BLOCK_ID]]
*/
fs.readdirSync("./").forEach((file) => {
  if (!file.endsWith(".md")) return;

  const fileContents = fs.readFileSync(file, "utf8");
  let newFileContents = fileContents;

  const blockEmbeds = newFileContents.matchAll(/\{{2}embed\s*\({2}(.*)\){2}\}{2}/g);
  for (const match of blockEmbeds) {
    const id = match[1];
    const path = idToPath[id];
    if (path) {
      const newPath = path.replace(".md", "");
      newFileContents = newFileContents.replace(
        match[0],
        `![[${newPath}#^${id}]]`
      );
    }
  }

  const inlineEmbeds = newFileContents.matchAll(/\({2}(.*)\){2}/g);
  for (const match of inlineEmbeds) {
    const id = match[1];
    const path = idToPath[id];
    if (path) {
      const newPath = path.replace(".md", "");
      newFileContents = newFileContents.replace(
        match[0],
        `{{inline}} ![[${newPath}#^${id}]]`
      );
    }
  }

  // logDiff(fileContents, newFileContents)
  fs.writeFileSync(file, newFileContents, "utf8");
})

