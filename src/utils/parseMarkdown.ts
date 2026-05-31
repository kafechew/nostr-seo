import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";

export async function parseNostrMarkdown(content: string) {
  // CRITICAL: This ensures LaTeX blocks ($$) are recognized correctly by adding newlines
  const preparedContent = content.replace(/\$\$(.*?)\$\$/gs, (match) => `\n\n${match}\n\n`);

  const result = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(preparedContent);

  return result.toString();
}