export async function fetchFile(url: string) {
  const res = await fetch(url);
  const text = await res.blob();
  return text;
}

export function getFullUrl(url: string) {
  url = new URL(url, import.meta.url).toString();
  return url;
}

const cache: Record<string, Promise<void>> = {};

function loadScript(attrs: Record<string, string>) {
  let { src } = attrs;
  if (src) src = getFullUrl(src);
  let value = cache[src || ''];
  if (!value) {
    value = new Promise((resolve, reject) => {
      const el = document.createElement('script');
      Object.entries(attrs).forEach(([key, value]) => {
        el[key] = value;
      });
      el.onload = () => resolve();
      el.onerror = reject;
      (document.body || document.documentElement).append(el);
      el.remove();
    });
    if (src) cache[src] = value;
  }
  return value;
}

export function loadJS(src: string) {
  return loadScript({ src });
}

export function loadModule(src: string) {
  return loadScript({ src, type: 'module' });
}
