import MarkdownIt from 'markdown-it';
import type { IRenderPlugin } from './types';
export declare function definePlugin(plugin: IRenderPlugin): IRenderPlugin;
export declare function patchHighlight(md: MarkdownIt, highlight: (content: string, lang: string, attrs: string) => string): void;
