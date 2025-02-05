import { type IRenderPlugin, builtInPlugins, pluginPreload } from '../plugins';

export class HtmlRenderer {
  static async create(plugins = builtInPlugins) {
    await pluginPreload(plugins);
    return new HtmlRenderer(plugins);
  }

  constructor(public plugins: IRenderPlugin[]) {}

  render(source: string) {
    return {
      html: source,
      plugins: this.plugins,
      onMounted: (el: HTMLElement) => this.process(el),
    };
  }

  process(el: HTMLElement, plugins: IRenderPlugin[] = this.plugins) {}
}
