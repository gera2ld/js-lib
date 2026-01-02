import type WebFont from 'webfontloader';
interface IWebFontOptions {
    config: WebFont.Config;
    fontFamily?: string;
}
export declare function webFont(options: IWebFontOptions): void;
export {};
