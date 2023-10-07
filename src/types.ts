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
    // IPFS
    IpfsCore: any;

    // Prism
    Prism: any;

    // highlightjs
    hljs: typeof hljs;

    // UnoCSS Runtime
    __unocss: any;
    __unocss_runtime: any;

    // Vega
    vegaEmbed: any;

    // Custom config
    __jslib?: {
      githubCorner?: {
        url: string;
        color?: string;
      };
      webFont?: {
        config?: any;
        fontFamily?: string;
      };
    };
  }
}
