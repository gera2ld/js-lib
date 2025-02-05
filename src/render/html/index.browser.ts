import { IRenderPlugin, pluginMounted } from '../plugins';
import { HtmlRenderer as BaseHtmlRenderer } from './base';

export class HtmlRenderer extends BaseHtmlRenderer {
  process(el: HTMLElement, plugins: IRenderPlugin[] = this.plugins) {
    pluginMounted(el, plugins);
  }
}
