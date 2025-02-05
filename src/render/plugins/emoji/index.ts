import type Emoji from 'emoji-js';
import type MarkdownIt from 'markdown-it';
import { definePlugin } from '../base';
import { loadEmoji } from './loader';

const re = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let emoji: Emoji;

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
    emoji.replace_mode = 'unified';
  },
  markdown: (md: MarkdownIt) => {
    md.inline.ruler.push('emoji', parseEmoji);
  },
});
