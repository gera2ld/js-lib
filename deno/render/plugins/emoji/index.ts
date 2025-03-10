import type Emoji from "https://esm.sh/emoji-js@3.8.1";
import type MarkdownIt from "https://esm.sh/markdown-it@14.1.0";
import { definePlugin } from "../base.ts";
import { loadEmoji } from "./loader.ts";
const re = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let emoji: Emoji;
function parseEmoji(state: any) {
  const matches = state.src[state.pos] === ':' && state.src.slice(state.pos).match(re);
  if (!matches) return false;
  const [m] = matches;
  state.pending += emoji.replace_colons(m);
  state.pos += m.length;
  return true;
}
export default definePlugin({
  name: 'emoji',
  async preload() {
    emoji = await loadEmoji();
    emoji.replace_mode = 'unified';
  },
  markdown: (md: MarkdownIt) => {
    md.inline.ruler.push('emoji', parseEmoji);
  }
});