import { safeHtml } from '@/util';
import { patchHighlight } from '../base';
import { IRenderPlugin } from '../types';

export const handleMarkdown: IRenderPlugin['markdown'] = (
  md,
  { enableFeature },
) => {
  patchHighlight(md, (code, lang) => {
    if (lang === 'mermaid') {
      enableFeature();
      return '<pre class="mermaid">' + safeHtml(code) + '</pre>';
    }
    return '';
  });
};
