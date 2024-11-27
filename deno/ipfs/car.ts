import { CarIndexer } from "https://esm.sh/@ipld/car@5.3.3";
import type { FileLike } from "https://esm.sh/ipfs-car@1.2.0";
import { CAREncoderStream, createDirectoryEncoderStream } from "https://esm.sh/ipfs-car@1.2.0";
import type { UnixFSEntry } from "https://esm.sh/ipfs-unixfs-exporter@13.6.1";
import { recursive } from "https://esm.sh/ipfs-unixfs-exporter@13.6.1";
import type { Block, Version } from "https://esm.sh/multiformats@12.1.3";
export async function packCar(files: FileLike[]) {
  const blocks: Block<unknown, number, number, Version>[] = [];
  await createDirectoryEncoderStream(files).pipeTo(new WritableStream({
    write(block) {
      blocks.push(block);
    }
  }));
  const rootCID = blocks.at(-1)!.cid;
  const chunks: Uint8Array[] = [];
  await new ReadableStream({
    pull(controller) {
      if (blocks.length) {
        controller.enqueue(blocks.shift());
      } else {
        controller.close();
      }
    }
  }).pipeThrough(new CAREncoderStream([rootCID])).pipeTo(new WritableStream({
    write(chunk) {
      chunks.push(chunk);
    }
  }));
  const car = new Blob(chunks);
  return {
    cid: rootCID.toString(),
    car
  };
}
export async function listCar(car: Uint8Array) {
  const iterable = await CarIndexer.fromBytes(car);
  const index = new Map<string, {
    blockLength: number;
    blockOffset: number;
  }>();
  const order: string[] = [];
  for await (const {
    cid,
    blockLength,
    blockOffset
  } of iterable) {
    const cidStr = cid.toString();
    index.set(cidStr, {
      blockLength,
      blockOffset
    });
    order.push(cidStr);
  }
  const roots = await iterable.getRoots();
  const entryIterable = recursive(roots[0], {
    get(cid) {
      const {
        blockOffset,
        blockLength
      } = index.get(cid.toString())!;
      return car.slice(blockOffset, blockOffset + blockLength);
    }
  });
  const entries: UnixFSEntry[] = [];
  for await (const entry of entryIterable) {
    entries.push(entry);
  }
  return entries;
}