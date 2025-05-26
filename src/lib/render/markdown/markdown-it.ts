import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';
import md_ins from 'markdown-it-ins';
import md_mark from 'markdown-it-mark';
import md_sub from 'markdown-it-sub';
import md_sup from 'markdown-it-sup';

export function initMarkdownIt() {
  const md = MarkdownIt({
    html: true,
    breaks: true,
  });
  md.use(md_ins).use(md_mark).use(md_sub).use(md_sup).use(MarkdownItAnchor);
  return md;
}
