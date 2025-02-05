import { builtInPlugins } from './built-in';

export async function pluginPreload(plugins = builtInPlugins) {
  await Promise.all(plugins.map((plugin) => plugin.preload?.()));
}

export async function pluginMounted(el: HTMLElement, plugins = builtInPlugins) {
  await Promise.all(plugins.map((plugin) => plugin.onMounted?.(el)));
}

export * from './base';
export * from './types';
export { builtInPlugins };
