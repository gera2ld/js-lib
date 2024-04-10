import MarkdownIt from 'markdown-it';
import md_ins from 'markdown-it-ins';
import md_mark from 'markdown-it-mark';
import md_sub from 'markdown-it-sub';
import md_sup from 'markdown-it-sup';

export const highlighters: Record<string, (code: string) => string> = {};

export const md = MarkdownIt({
  html: true,
  breaks: true,
  highlight(code, lang) {
    const highlight = highlighters[lang] || highlighters.default;
    return highlight?.(code);
  },
});
md.use(md_ins).use(md_mark).use(md_sub).use(md_sup);
