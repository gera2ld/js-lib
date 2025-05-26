/**
 * @param {string} gistPath e.g. `gist:xxxx`, `gist:xxx/file.txt`
 */
export function getGistUrl(gistPath: string) {
  if (!gistPath.startsWith('gist:')) throw new Error('Invalid gist URL');
  return `https://gist.githubusercontent.com/raw/${gistPath.slice(5)}`;
}

export function getFullUrl(url: string) {
  url = new URL(url, import.meta.url).toString();
  return url;
}

export function safeHtml(text: string) {
  return text.replace(
    /[<&]/g,
    (m) =>
      ({
        '<': '&lt;',
        '&': '&amp;',
      })[m] || '',
  );
}
