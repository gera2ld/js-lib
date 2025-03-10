import { once } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.33.0/+esm";
export const loadEmoji = once(async () => {
  const {
    EmojiConvertor
  } = await import("https://esm.sh/emoji-js@3.8.1");
  const emoji = new EmojiConvertor();
  return emoji;
});