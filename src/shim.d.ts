declare module 'https://*';

interface Window {
  // IPFS
  IpfsCore: any;

  // highlightjs
  hljs: typeof import('highlight.js').default;

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
declare const __versions__: Record<string, string>;
