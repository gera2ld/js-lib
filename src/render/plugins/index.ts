import emoji from './emoji';
import hljs from './hljs';
import vega from './vega';

export const builtInPlugins = [emoji, hljs, vega];

export async function pluginPreload(plugins = builtInPlugins) {
  await Promise.all(plugins.map((plugin) => plugin.preload?.()));
}

export async function pluginMounted(el: HTMLElement, plugins = builtInPlugins) {
  await Promise.all(plugins.map((plugin) => plugin.onMounted?.(el)));
}

export * from './types';
