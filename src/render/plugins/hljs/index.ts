import { noop } from 'es-toolkit';
import { HLJSApi } from 'highlight.js';
import { definePlugin } from '../base';
import { IRenderPlugin } from '../types';
import { initialize } from './common';

export const loadHljsCss = noop;
export const handleMounted = noop;

let hljsLoaded: HLJSApi;

const loadHljs = async () => {
  const { default: hljs } = await import('highlight.js');
  hljsLoaded = initialize(hljs);
  return hljsLoaded;
};

const handlePreload = async () => {
  await loadHljs();
};

const handleMarkdown: IRenderPlugin['markdown'] = (
  _md,
  { enableFeature, highlighters },
) => {
  highlighters.default = (code: string, lang: string) => {
    enableFeature();
    return hljsLoaded.highlightAuto(code, lang ? [lang] : undefined).value;
  };
};

export default definePlugin({
  name: 'hljs',
  preload: handlePreload,
  markdown: handleMarkdown,
  onMounted: handleMounted,
});
