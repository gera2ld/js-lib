import { safeHtml } from '../../../../lib/util';
import { patchHighlight } from '../base';
import { IRenderPlugin } from '../types';

export const handleMarkdown: IRenderPlugin['markdown'] = (
  md,
  { enableFeature },
) => {
  patchHighlight(md, (content: string, lang: string, _attrs: string) => {
    if (lang === 'vega') {
      enableFeature();
      return `<div class="vega">${safeHtml(content)}</div>`;
    }
    return '';
  });
};
