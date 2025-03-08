import emoji from './emoji';
import mermaid from './mermaid';
import shiki from './shiki';
import vega from './vega';

export const pluginMap = {
  emoji,
  mermaid,
  shiki,
  vega,
};

export const builtInPlugins = [emoji, shiki, vega, mermaid];
