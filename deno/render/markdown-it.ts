import MarkdownIt from "https://esm.sh/markdown-it@14.1.0";
import md_ins from "https://esm.sh/markdown-it-ins@4.0.0";
import md_mark from "https://esm.sh/markdown-it-mark@4.0.0";
import md_sub from "https://esm.sh/markdown-it-sub@2.0.0";
import md_sup from "https://esm.sh/markdown-it-sup@2.0.0";
export const highlighters: Record<string, (code: string) => string> = {};
export const md = MarkdownIt({
  html: true,
  breaks: true,
  highlight(code, lang) {
    const highlight = highlighters[lang] || highlighters.default;
    return highlight?.(code);
  }
});
md.use(md_ins).use(md_mark).use(md_sub).use(md_sup);