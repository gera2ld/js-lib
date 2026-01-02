import { type IRenderPlugin } from '../plugins';
import type { IMarkdownData } from '../types';
import { MarkdownRenderer as BaseMarkdownRenderer } from './base';
export { loadMarkdownIt, parseFrontmatter } from './base';
export declare class MarkdownRenderer extends BaseMarkdownRenderer {
    process(el: HTMLElement, plugins?: IRenderPlugin[]): void;
}
export declare function renderMarkdown({ content }: IMarkdownData, el: HTMLElement): Promise<void>;
