import { wrapFunction } from '@gera2ld/common';
import MarkdownIt from 'markdown-it';
import type { IRenderPlugin } from './types';

export function definePlugin(plugin: IRenderPlugin) {
  return plugin;
}

export function patchHighlight(
  md: MarkdownIt,
  highlight: (content: string, lang: string, attrs: string) => string,
) {
  if (md.options.highlight) {
    md.options.highlight = wrapFunction(md.options.highlight, (fn, ...args) => {
      return highlight(...args) || fn(...args);
    });
  } else {
    md.options.highlight = highlight;
  }
}
