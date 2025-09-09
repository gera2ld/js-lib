import type { CodeToHastOptions } from 'shiki';

export const shikiOptions: CodeToHastOptions<string, string> = {
  lang: 'text',
  themes: {
    light: 'min-light',
    dark: 'tokyo-night',
  },
  defaultColor: false,
  transformers: [
    {
      pre(hast) {
        // Delete the background of `<pre>`
        delete hast.properties.style;
      },
    },
  ],
};

export const shikiCss = `\
.shiki span {
  color: var(--shiki-light, inherit);
  background-color: var(--shiki-light-bg, inherit);
  font-style: var(--shiki-light-font-style, inherit);
  font-weight: var(--shiki-light-font-weight, inherit);
  text-decoration: var(--shiki-light-text-decoration, inherit);
}
@media (prefers-color-scheme: dark) {
  .shiki span {
    color: var(--shiki-dark, inherit);
    background-color: var(--shiki-dark-bg, inherit);
    font-style: var(--shiki-dark-font-style, inherit);
    font-weight: var(--shiki-dark-font-weight, inherit);
    text-decoration: var(--shiki-dark-text-decoration, inherit);
  }
}`;
