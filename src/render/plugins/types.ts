import type MarkdownIt from 'markdown-it';

export interface IRenderPlugin {
  name: string;
  always?: boolean;
  /**
   * Prepare assets for transformation.
   * Should be safe to call multiple times.
   * Should only be called when preprocessing is needed.
   */
  preload?: () => Promise<void>;
  /** Prepare MarkdownIt for transformation */
  markdown?: (
    md: MarkdownIt,
    opts: {
      enableFeature: () => void;
    },
  ) => void;
  /**
   * Run after the HTML is mounted to DOM.
   * Should be safe to run no matter whether the data is preprocessed.
   */
  onMounted?: (el: HTMLElement) => void;
}
