import { noop } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.32.0/+esm";
import { HLJSApi } from "https://esm.sh/highlight.js@11.11.1";
import { definePlugin, patchHighlight } from "../base.ts";
import { IRenderPlugin } from "../types.ts";
import { initialize } from "./common.ts";
export const loadHljsCss = noop;
export const handleMounted = noop;
let hljsLoaded: HLJSApi;
const loadHljs = async () => {
  const {
    default: hljs
  } = await import("https://esm.sh/highlight.js@11.11.1");
  hljsLoaded = initialize(hljs);
  return hljsLoaded;
};
const handlePreload = async () => {
  await loadHljs();
};
const handleMarkdown: IRenderPlugin['markdown'] = (md, {
  enableFeature
}) => {
  patchHighlight(md, (code: string, lang: string, _attrs: string) => {
    enableFeature();
    return hljsLoaded.highlightAuto(code, lang ? [lang] : undefined).value;
  });
};
export default definePlugin({
  name: 'hljs',
  preload: handlePreload,
  markdown: handleMarkdown,
  onMounted: handleMounted
});