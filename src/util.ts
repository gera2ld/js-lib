export interface IDeferred<T, U = unknown> {
  promise: Promise<T>;
  resolve: (res: T | Promise<T>) => void;
  reject: (err: U) => void;
}

export function defer<T, U = unknown>(): IDeferred<T, U> {
  let resolve = (_res: T | Promise<T>) => {};
  let reject = (_err: U) => {};
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

type IFunction<U extends any[], V, T> = (this: T, ...args: U) => V;

export function wrapFunction<U extends any[], V, T>(
  fn: IFunction<U, V, T>,
  wrapper: (this: T, originalFn: IFunction<U, V, T>, ...args: U) => V,
) {
  return function wrapped(this: T, ...args: U) {
    return wrapper.call(this, fn, ...args);
  };
}

export function limitConcurrency<T extends unknown[], U>(
  fn: (...args: T) => Promise<U>,
  concurrency: number,
) {
  const tokens: IDeferred<void>[] = [];
  const processing = new Set();
  async function getToken() {
    const token = defer<void>();
    tokens.push(token);
    check();
    await token.promise;
    return token;
  }
  function releaseToken(token: IDeferred<void>) {
    processing.delete(token);
    check();
  }
  function check() {
    while (tokens.length && processing.size < concurrency) {
      const token = tokens.shift();
      processing.add(token);
      token!.resolve();
    }
  }
  async function limited(...args: T) {
    const token = await getToken();
    try {
      return await fn(...args);
    } finally {
      releaseToken(token);
    }
  }
  return limited;
}

export class Queue<T> {
  private data: T[] = [];

  private getQueue = new Set<IDeferred<void>>();
  private putQueue = new Set<IDeferred<void>>();

  constructor(public maxSize = 0) {}

  get size() {
    return this.data.length;
  }

  private defer(queue: Set<IDeferred<void>>, maxWait = 0) {
    const deferred = defer<void>();
    queue.add(deferred);
    deferred.promise.finally(() => {
      queue.delete(deferred);
    });
    if (maxWait) setTimeout(deferred.reject, maxWait);
    return deferred.promise;
  }

  private resolve(queue: Set<IDeferred<void>>) {
    const first = queue.values().next().value as IDeferred<void>;
    if (first) {
      first.resolve();
      queue.delete(first);
    }
  }

  async get(maxWait = 0) {
    if (!this.data.length) await this.defer(this.getQueue, maxWait);
    const result = this.data.shift();
    this.resolve(this.putQueue);
    return result;
  }

  async put(item: T, maxWait = 0) {
    if (this.maxSize && this.data.length >= this.maxSize) {
      await this.defer(this.putQueue, maxWait);
    }
    this.data.push(item);
    this.resolve(this.getQueue);
  }
}

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

export function forwardFunction<U extends any[], V, T>(
  loader: () => Promise<IFunction<U, Promise<V>, T>>,
) {
  return async function forwarded(this: T, ...args: U): Promise<V> {
    const fn = await loader();
    return fn.apply(this, args);
  };
}
