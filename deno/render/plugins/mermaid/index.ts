import { definePlugin } from "../base.ts";
import { handleMarkdown } from "./common.ts";
export default definePlugin({
  name: 'mermaid',
  markdown: handleMarkdown
});