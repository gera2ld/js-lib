import hljs from 'highlight.js';
import type { Remarkable as IRemarkable } from 'remarkable';

export interface IMarkdownPlugin {
  name: string;
  always?: boolean;
  plugin?: (md: IRemarkable, opts: { enableFeature: () => void }) => void;
  onMounted?: (el: HTMLElement) => void;
}

export interface IMarkdownData {
  content: string;
  frontmatter?: Record<string, unknown>;
}

declare global {
  interface Window {
    IpfsCore: any;
    Prism: any;
    hljs: typeof hljs;
  }
}
