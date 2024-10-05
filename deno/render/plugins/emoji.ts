import { loadCSS, loadJS } from "../../util.ts";
import type Emoji from "https://esm.sh/emoji-js@3.8.0";
import { once } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.23.0/+esm";
import type MarkdownIt from "https://esm.sh/markdown-it@14.1.0";
import { definePlugin } from "./base.ts";
const re = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let emoji: Emoji;
const loadEmoji = once(async () => {
  loadCSS(`https://cdn.jsdelivr.net/npm/emoji-js@${"3.8.0"}/lib/emoji.min.css`);
  await loadJS(`https://cdn.jsdelivr.net/npm/emoji-js@${"3.8.0"}/lib/emoji.min.js`);
  const emoji: EmojiConvertor = new window.EmojiConvertor();
  emoji.replace_mode = 'unified';
  return emoji;
});
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
  },
  markdown: (md: MarkdownIt) => {
    md.inline.ruler.push('emoji', parseEmoji);
  }
});