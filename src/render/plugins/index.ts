import emoji from './emoji';
import hljs from './hljs';
import vega from './vega';
import mermaid from './mermaid';

export const builtInPlugins = [emoji, hljs, vega, mermaid];

export async function pluginPreload(plugins = builtInPlugins) {
  await Promise.all(plugins.map((plugin) => plugin.preload?.()));
}

export async function pluginMounted(el: HTMLElement, plugins = builtInPlugins) {
  await Promise.all(plugins.map((plugin) => plugin.onMounted?.(el)));
}

export * from './types';
