import { once } from 'es-toolkit';

export const loadEmoji = once(async () => {
  const { EmojiConvertor } = await import('emoji-js');
  const emoji = new EmojiConvertor();
  return emoji;
});
