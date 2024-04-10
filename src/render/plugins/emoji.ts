import { loadCSS, loadJS, memoize } from '@/util';
import type Emoji from 'emoji-js';
import { definePlugin } from './base';
import type MarkdownIt from 'markdown-it';

const re = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let emoji: Emoji;

const loadEmoji = memoize(async () => {
  loadCSS(
    `https://cdn.jsdelivr.net/npm/emoji-js@${__versions__.emojiJs}/lib/emoji.min.css`,
  );
  await loadJS(
    `https://cdn.jsdelivr.net/npm/emoji-js@${__versions__.emojiJs}/lib/emoji.min.js`,
  );
  const emoji: EmojiConvertor = new window.EmojiConvertor();
  emoji.replace_mode = 'unified';
  return emoji;
});

function parseEmoji(state: any) {
  const matches =
    state.src[state.pos] === ':' && state.src.slice(state.pos).match(re);
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
  },
});
