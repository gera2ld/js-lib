interface IUnocssOptions {
    unocss?: any;
    prepare?: (defaultPrepare?: (options?: IUnocssOptions) => Promise<void>) => Promise<void>;
}
export declare function initialize(options?: IUnocssOptions): Promise<void>;
export {};
