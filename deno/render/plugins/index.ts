import emoji from "./emoji.ts";
import hljs from "./hljs.ts";
import vega from "./vega.ts";
import mermaid from "./mermaid.ts";
export const builtInPlugins = [emoji, hljs, vega, mermaid];
export async function pluginPreload(plugins = builtInPlugins) {
  await Promise.all(plugins.map(plugin => plugin.preload?.()));
}
export async function pluginMounted(el: HTMLElement, plugins = builtInPlugins) {
  await Promise.all(plugins.map(plugin => plugin.onMounted?.(el)));
}
export * from "./types.ts";