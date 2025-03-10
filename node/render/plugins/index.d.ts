export declare function pluginPreload(plugins?: import("./types").IRenderPlugin[]): Promise<void>;
export declare function pluginMounted(el: HTMLElement, plugins?: import("./types").IRenderPlugin[]): Promise<void>;
export * from './base';
export * from './built-in';
export * from './types';
