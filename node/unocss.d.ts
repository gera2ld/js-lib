interface IUnocssOptions {
    unocss?: any;
    init?: {
        reset?: string;
    };
}
export declare function initialize(options?: IUnocssOptions): Promise<void>;
export declare function buildCSSFromShortcuts(shortcuts: Record<string, string>): Promise<string>;
export declare function injectStyleByShortcuts(shortcuts: Record<string, string>): Promise<HTMLStyleElement>;
export {};
