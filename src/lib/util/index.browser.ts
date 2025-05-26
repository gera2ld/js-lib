import { getFullUrl } from './base.ts';

export * from './base.ts';

const cache: Record<string, Promise<void>> = {};

function loadScript(attrs: Record<string, string>) {
  let { src } = attrs;
  if (src) src = getFullUrl(src);
  let value = cache[src || ''];
  if (!value) {
    value = new Promise((resolve, reject) => {
      const el = document.createElement('script');
      Object.entries(attrs).forEach(([key, value]) => {
        (el as any)[key] = value;
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

export function loadCSS(src: string) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = src;
  document.head.append(link);
}
