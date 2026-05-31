import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm"; // 👈 Add this
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";

export async function parseNostrMarkdown(content: string) {
  // Use [\s\S] instead of the 's' flag to avoid the ES2018 target error
  const preparedContent = content.replace(/\$\$([\s\S]*?)\$\$/g, (match) => `\n\n${match}\n\n`);

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm) // 👈 Add this to enable tables
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex, {
      output: 'html',
      strict: false
    })
    .use(rehypeStringify)
    .process(preparedContent);

  return result.toString();
}