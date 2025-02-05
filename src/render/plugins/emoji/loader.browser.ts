import { loadJS } from '@/util';
import { once } from 'es-toolkit';

export const loadEmoji = once(async () => {
  // CSS is not needed in `unified` mode
  // loadCSS(
  //   `https://cdn.jsdelivr.net/npm/emoji-js@${__versions__.emojiJs}/lib/emoji.min.css`,
  // );
  await loadJS(
    `https://cdn.jsdelivr.net/npm/emoji-js@${__versions__.emojiJs}/lib/emoji.min.js`,
  );
  const emoji: EmojiConvertor = new window.EmojiConvertor();
  return emoji;
});
