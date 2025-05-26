import { once } from 'es-toolkit';
import type { PluginSimple } from 'markdown-it';
import type { BundledLanguage } from 'shiki';
import { definePlugin, patchHighlight } from '../base';
import type { IRenderPlugin } from '../types';
import { shikiOptions } from './common';

let shikiPlugin: PluginSimple;

const loadShiki = once(async () => {
  const { default: Shiki } = await import('@shikijs/markdown-it');
  shikiPlugin = await Shiki({
    fallbackLanguage: 'text' as BundledLanguage,
    ...shikiOptions,
  });
});

const handlePreload = async () => {
  await loadShiki();
};

const handleMarkdown: IRenderPlugin['markdown'] = (md) => {
  const { highlight } = md.options;
  md.use(shikiPlugin);
  if (highlight) patchHighlight(md, (...args) => highlight(...args));
};

export default definePlugin({
  name: 'shiki',
  preload: handlePreload,
  markdown: handleMarkdown,
});
