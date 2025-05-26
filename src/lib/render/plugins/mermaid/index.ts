import { definePlugin } from '../base';
import { handleMarkdown } from './common';

export default definePlugin({
  name: 'mermaid',
  markdown: handleMarkdown,
});
