import type WebFont from 'webfontloader';
interface IWebFontOptions {
    config: WebFont.Config;
    fontFamily?: string;
}
export declare function webFont(options: IWebFontOptions): Promise<void>;
export declare function initialize(options: IWebFontOptions): void;
export {};
