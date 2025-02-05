import { MarkdownRenderer } from '../dist/deno/render/index.ts';

const content = `\
# hello

- test
  - markdown

\`\`\`py
print('hello, world')
\`\`\`
`;
const renderer = await MarkdownRenderer.create();
const { html } = renderer.render(content);
console.log(html);
