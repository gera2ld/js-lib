import { once } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.33.0/+esm";
import MarkdownIt from "https://esm.sh/markdown-it@14.1.0";
import { BundledLanguage } from "https://esm.sh/shiki@3.1.0";
import { definePlugin, patchHighlight } from "../base.ts";
import { IRenderPlugin } from "../types.ts";
import { shikiOptions } from "./common.ts";
let shikiPlugin: MarkdownIt.PluginSimple;
const loadShiki = once(async () => {
  const {
    default: Shiki
  } = await import("https://esm.sh/@shikijs/markdown-it@3.1.0");
  shikiPlugin = await Shiki({
    fallbackLanguage: 'text' as BundledLanguage,
    ...shikiOptions
  });
});
const handlePreload = async () => {
  await loadShiki();
};
const handleMarkdown: IRenderPlugin['markdown'] = md => {
  const {
    highlight
  } = md.options;
  md.use(shikiPlugin);
  if (highlight) patchHighlight(md, (...args) => highlight(...args));
};
export default definePlugin({
  name: 'shiki',
  preload: handlePreload,
  markdown: handleMarkdown
});