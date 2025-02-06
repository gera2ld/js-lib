import { builtInPlugins } from './built-in';
export declare function pluginPreload(plugins?: import("./types").IRenderPlugin[]): Promise<void>;
export declare function pluginMounted(el: HTMLElement, plugins?: import("./types").IRenderPlugin[]): Promise<void>;
export * from './base';
export * from './types';
export { builtInPlugins };
