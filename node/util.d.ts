export { simpleRequest } from 'common-lib/src/http/request.ts';
export { defer, wrapFunction, type IDeferred } from 'common-lib/src/util.ts';
type IFunction<U extends any[], V, T> = (this: T, ...args: U) => V;
export declare function limitConcurrency<T extends unknown[], U>(fn: (...args: T) => Promise<U>, concurrency: number): (...args: T) => Promise<U>;
export declare class Queue<T> {
    maxSize: number;
    private data;
    private getQueue;
    private putQueue;
    constructor(maxSize?: number);
    get size(): number;
    private defer;
    private resolve;
    get(maxWait?: number): Promise<T | undefined>;
    put(item: T, maxWait?: number): Promise<void>;
}
export declare function getFullUrl(url: string): string;
export declare function loadJS(src: string): Promise<void>;
export declare function loadCSS(src: string): void;
export declare function forwardFunction<U extends any[], V, T>(loader: () => Promise<IFunction<U, Promise<V>, T>>): (this: T, ...args: U) => Promise<V>;
export declare function safeHtml(text: string): string;
