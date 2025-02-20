import type MarkdownIt from 'markdown-it';

export interface IRenderPlugin {
  name: string;
  always?: boolean;
  /** Prepare assets for transformation, run once */
  preload?: () => Promise<void>;
  /** Prepare MarkdownIt for transformation */
  markdown?: (
    md: MarkdownIt,
    opts: {
      enableFeature: () => void;
      highlighters: Record<string, (code: string, lang: string) => string>;
    },
  ) => void;
  /** Run after the HTML is mounted to DOM */
  onMounted?: (el: HTMLElement) => void;
}
