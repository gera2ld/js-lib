import type { Remarkable as IRemarkable } from 'remarkable';
import { loadCSS, loadJS } from './loader';
import { IMarkdownPlugin } from './types';

let emojiPromise: Promise<EmojiConvertor>;

async function loadEmojiOnce() {
  loadCSS('https://cdn.jsdelivr.net/npm/emoji-js@3.7.0/lib/emoji.min.css');
  await loadJS('https://cdn.jsdelivr.net/npm/emoji-js@3.7.0/lib/emoji.min.js');
  const emoji: EmojiConvertor = new window.EmojiConvertor();
  emoji.replace_mode = 'unified';
  return emoji;
}

export function loadEmoji() {
  emojiPromise ||= loadEmojiOnce();
  return emojiPromise;
}

export async function loadPluginEmoji(): Promise<IMarkdownPlugin> {
  const emoji = await loadEmoji();
  const re = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
  function parseEmoji(state) {
    const matches =
      state.src[state.pos] === ':' && state.src.slice(state.pos).match(re);
    if (!matches) return false;
    const [m] = matches;
    state.pending += emoji.replace_colons(m);
    state.pos += m.length;
    return true;
  }
  return {
    name: 'emoji',
    plugin: (md: IRemarkable) => {
      md.inline.ruler.push('emoji', parseEmoji, {});
    },
  };
}
