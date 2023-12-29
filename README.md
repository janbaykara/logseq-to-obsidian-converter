This is a simple node script that replaces Logseq embeds (block and inline) with Obsidian transclusions.

### Caveats

- As at December 2023, Obsidian does not have inline transclusions, so all Logseq block references are converted into block transclusions. [Feature request here](https://forum.obsidian.md/t/a-proposal-for-rendering-block-embeds-inline/27093/1)

### How to use it

1. Back up the folder whose files you want to transform
2. Drop `logseq-to-obsidian.js` into the folder
4. `cd` into the folder, then run `node logseq-to-obsidian`

### Technical details

The script looks for the following Logseq embed patterns:

```md
((634403fd-273a-4a14-a768-f2af37ab9e0c))
{{embed ((6343f721-23dc-4554-95dc-66118542a7ca))}}
```

And is what they are transformed into:

```md
{{inline}} ![[PATH_NAME#^BLOCK_ID]]
![[PATH_NAME#^BLOCK_ID]]
```