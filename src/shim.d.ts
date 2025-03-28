declare module 'https://*';
declare module 'markdown-it-*';

interface Window {
  // highlightjs
  hljs: typeof import('highlight.js').HLJSApi;

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
