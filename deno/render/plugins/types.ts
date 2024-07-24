import type MarkdownIt from "https://esm.sh/markdown-it@14.1.0";
export interface IRenderPlugin {
  name: string;
  always?: boolean;
  preload?: () => Promise<void>;
  markdown?: (md: MarkdownIt, opts: {
    enableFeature: () => void;
    highlighters: Record<string, (code: string) => string>;
  }) => void;
  onMounted?: (el: HTMLElement) => void;
}