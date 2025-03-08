import { safeHtml } from "../../../util.ts";
import { patchHighlight } from "../base.ts";
import { IRenderPlugin } from "../types.ts";
export const handleMarkdown: IRenderPlugin['markdown'] = (md, {
  enableFeature
}) => {
  patchHighlight(md, (content: string, lang: string, _attrs: string) => {
    if (lang === 'vega') {
      enableFeature();
      return `<div class="vega">${safeHtml(content)}</div>`;
    }
    return '';
  });
};