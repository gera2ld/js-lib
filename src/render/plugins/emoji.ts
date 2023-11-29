import type Emoji from 'emoji-js';
import type { Remarkable as IRemarkable } from 'remarkable';
import { loadCSS, loadJS, memoize } from '@/loader';
import { definePlugin } from './base';

const re = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let emoji: Emoji;

const loadEmoji = memoize(async () => {
  loadCSS('https://cdn.jsdelivr.net/npm/emoji-js@3.7.0/lib/emoji.min.css');
  await loadJS('https://cdn.jsdelivr.net/npm/emoji-js@3.7.0/lib/emoji.min.js');
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
  remarkable: (md: IRemarkable) => {
    md.inline.ruler.push('emoji', parseEmoji, {});
  },
});
