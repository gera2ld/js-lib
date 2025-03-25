import { wrapFunction } from "../../util.ts";
import MarkdownIt from "https://esm.sh/markdown-it@14.1.0";
import type { IRenderPlugin } from "./types.ts";
export function definePlugin(plugin: IRenderPlugin) {
  return plugin;
}
export function patchHighlight(md: MarkdownIt, highlight: (content: string, lang: string, attrs: string) => string) {
  if (md.options.highlight) {
    md.options.highlight = wrapFunction(md.options.highlight, (fn, ...args) => {
      return highlight(...args) || fn(...args);
    });
  } else {
    md.options.highlight = highlight;
  }
}