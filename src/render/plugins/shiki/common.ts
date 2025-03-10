import type { CodeToHastOptions } from 'shiki';

export const shikiOptions: CodeToHastOptions<string, string> = {
  lang: 'text',
  themes: {
    light: 'min-light',
    dark: 'tokyo-night',
  },
  transformers: [
    {
      pre(hast) {
        // Delete the background of `<pre>`
        delete hast.properties.style;
      },
    },
  ],
};
