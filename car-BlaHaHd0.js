import { CarIndexer as l } from "https://cdn.jsdelivr.net/npm/@ipld/car@5.3.2/+esm";
import { createDirectoryEncoderStream as p, CAREncoderStream as u } from "https://cdn.jsdelivr.net/npm/ipfs-car@1.2.0/+esm";
import { recursive as w } from "https://cdn.jsdelivr.net/npm/ipfs-unixfs-exporter@13.6.1/+esm";
async function h(n) {
  const e = [];
  await p(n).pipeTo(
    new WritableStream({
      write(t) {
        e.push(t);
      }
    })
  );
  const o = e.at(-1).cid, c = [];
  await new ReadableStream({
    pull(t) {
      e.length ? t.enqueue(e.shift()) : t.close();
    }
  }).pipeThrough(new u([o])).pipeTo(
    new WritableStream({
      write(t) {
        c.push(t);
      }
    })
  );
  const s = new Blob(c);
  return { cid: o.toString(), car: s };
}
async function d(n) {
  const e = await l.fromBytes(n), o = /* @__PURE__ */ new Map();
  for await (const { cid: r, blockLength: i, blockOffset: a } of e) {
    const f = r.toString();
    o.set(f, { blockLength: i, blockOffset: a });
  }
  const c = await e.getRoots(), s = w(c[0], {
    get(r) {
      const { blockOffset: i, blockLength: a } = o.get(r.toString());
      return n.slice(i, i + a);
    }
  }), t = [];
  for await (const r of s)
    t.push(r);
  return t;
}
export {
  d as listCar,
  h as packCar
};
