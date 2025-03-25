import type { CodeToHastOptions } from "https://esm.sh/shiki@3.2.1";
export const shikiOptions: CodeToHastOptions<string, string> = {
  lang: 'text',
  themes: {
    light: 'min-light',
    dark: 'tokyo-night'
  },
  transformers: [{
    pre(hast) {
      // Delete the background of `<pre>`
      delete hast.properties.style;
    }
  }]
};