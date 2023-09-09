export async function fetchBlob(url: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  return blob;
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

export function loadCSS(src: string) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = src;
  document.head.append(link);
}

export function wrapFunction<T extends any[], U>(
  fn: (...args: T) => U,
  wrapper: (originalFn: (...args: T) => U, ...args: T) => (...args: T) => U
) {
  return function wrapped(...args: T) {
    return wrapper.call(this, fn, ...args);
  };
}

export function memoize<T extends any[], U>(fn: (...args: T) => U) {
  let cache: { result: U };
  return function memoized(...args: T) {
    cache ||= fn.apply(this, args);
    return cache.result;
  };
}
