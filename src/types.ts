import hljs from 'highlight.js';
import type { Remarkable as IRemarkable } from 'remarkable';

export interface IMarkdownPlugin {
  plugin?: (md: IRemarkable) => void;
  postrender?: (el: HTMLElement) => void;
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
