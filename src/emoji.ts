import { loadCSS, loadJS } from './loader';

let emojiPromise: Promise<any>;

async function loadEmojiOnce() {
  loadCSS('https://cdn.jsdelivr.net/npm/emoji-js@3.7.0/lib/emoji.min.css');
  await loadJS('https://cdn.jsdelivr.net/npm/emoji-js@3.7.0/lib/emoji.min.js');
  const emoji = new window.EmojiConvertor();
  emoji.replace_mode = 'unified';
  return emoji;
}

export function loadEmoji() {
  emojiPromise ||= loadEmojiOnce();
  return emojiPromise;
}
