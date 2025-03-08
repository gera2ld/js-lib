import { safeHtml } from "../../../util.ts";
import { patchHighlight } from "../base.ts";
import { IRenderPlugin } from "../types.ts";
export const handleMarkdown: IRenderPlugin['markdown'] = (md, {
  enableFeature
}) => {
  patchHighlight(md, (code, lang) => {
    if (lang === 'mermaid') {
      enableFeature();
      return '<pre class="mermaid">' + safeHtml(code) + '</pre>';
    }
    return '';
  });
};