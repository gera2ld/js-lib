import type { IMarkdownData } from '@/types';
import { noop } from 'es-toolkit';
import type MarkdownIt from 'markdown-it';
import { type IRenderPlugin } from '../plugins';
export declare const loadMarkdownIt: () => Promise<typeof import("./markdown-it")>;
export declare class MarkdownRenderer {
    plugins: IRenderPlugin[];
    private md;
    readonly highlighters: Record<string, (code: string) => string>;
    private features;
    static create(plugins?: IRenderPlugin[]): Promise<MarkdownRenderer>;
    constructor(plugins: IRenderPlugin[], md: MarkdownIt, highlighters: Record<string, (code: string) => string>);
    private enableFeature;
    render(source: string): {
        html: string;
        plugins: IRenderPlugin[];
        onMounted: (el: HTMLElement) => void;
    };
    process(el: HTMLElement, plugins?: IRenderPlugin[]): void;
}
export declare function parseFrontmatter(content: string): Promise<IMarkdownData>;
export declare const renderMarkdown: typeof noop;
