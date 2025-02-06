import { MarkdownRenderer } from '../../dist/node/render.js';

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
