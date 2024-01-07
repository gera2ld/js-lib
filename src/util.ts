export interface IDeferred<T, U = unknown> {
  promise: Promise<T>;
  resolve: (res: T) => void;
  reject: (err: U) => void;
}

export function defer<T, U = unknown>(): IDeferred<T, U> {
  let resolve = (_res: T) => {};
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

export function memoize<U extends any[], V, T>(fn: IFunction<U, V, T>) {
  let cache: { result: V };
  return function memoized(this: T, ...args: U) {
    cache ||= {
      result: fn.apply(this, args),
    };
    return cache.result;
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
