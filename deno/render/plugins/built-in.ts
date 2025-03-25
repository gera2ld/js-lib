import emoji from "./emoji/index.ts";
import mermaid from "./mermaid/index.ts";
import shiki from "./shiki/index.ts";
import vega from "./vega/index.ts";
export const pluginMap = {
  emoji,
  mermaid,
  shiki,
  vega
};
export const builtInPlugins = [emoji, shiki, vega, mermaid];