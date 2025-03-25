import MarkdownIt from "https://esm.sh/markdown-it@14.1.0";
import MarkdownItAnchor from "https://esm.sh/markdown-it-anchor@9.2.0";
import md_ins from "https://esm.sh/markdown-it-ins@4.0.0";
import md_mark from "https://esm.sh/markdown-it-mark@4.0.0";
import md_sub from "https://esm.sh/markdown-it-sub@2.0.0";
import md_sup from "https://esm.sh/markdown-it-sup@2.0.0";
export function initMarkdownIt() {
  const md = MarkdownIt({
    html: true,
    breaks: true
  });
  md.use(md_ins).use(md_mark).use(md_sub).use(md_sup).use(MarkdownItAnchor);
  return md;
}