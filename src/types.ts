import hljs from 'highlight.js';

export interface IMarkdownData {
  content: string;
  frontmatter?: Record<string, unknown>;
}

declare global {
  interface Window {
    // IPFS
    IpfsCore: any;

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

  // Versions of dependencies
  const __versions__: Record<string, string>;
}
