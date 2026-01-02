import { IRenderPlugin } from '../plugins';
import { HtmlRenderer as BaseHtmlRenderer } from './base';
export declare class HtmlRenderer extends BaseHtmlRenderer {
    process(el: HTMLElement, plugins?: IRenderPlugin[]): void;
}
