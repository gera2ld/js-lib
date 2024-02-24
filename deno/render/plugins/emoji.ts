import { loadCSS, loadJS, memoize } from "../../util.ts";
import type Emoji from "https://esm.sh/emoji-js@3.8.0";
import type { Remarkable as IRemarkable } from "https://esm.sh/remarkable@2.0.1";
import { definePlugin } from "./base.ts";
const re = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let emoji: Emoji;
const loadEmoji = memoize(async () => {
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
  remarkable: (md: IRemarkable) => {
    md.inline.ruler.push('emoji', parseEmoji, {});
  }
});