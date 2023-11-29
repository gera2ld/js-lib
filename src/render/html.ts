import {
  type IRenderPlugin,
  builtInPlugins,
  pluginPreload,
  pluginMounted,
} from './plugins';

export class HtmlRenderer {
  static async create(plugins = builtInPlugins) {
    await pluginPreload(plugins);
    return new HtmlRenderer(plugins);
  }

  constructor(public plugins: IRenderPlugin[]) {}

  process(el: HTMLElement) {
    pluginMounted(el, this.plugins);
  }
}
