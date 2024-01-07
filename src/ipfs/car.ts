import { CarIndexer } from '@ipld/car';
import type { FileLike } from 'ipfs-car';
import { CAREncoderStream, createDirectoryEncoderStream } from 'ipfs-car';
import type { UnixFSEntry } from 'ipfs-unixfs-exporter';
import { recursive } from 'ipfs-unixfs-exporter';
import type { Block, Version } from 'multiformats';

export async function packCar(files: FileLike[]) {
  const blocks: Block<unknown, number, number, Version>[] = [];
  await createDirectoryEncoderStream(files).pipeTo(
    new WritableStream({
      write(block) {
        blocks.push(block);
      },
    }),
  );
  const rootCID = blocks.at(-1)!.cid;
  const chunks: Uint8Array[] = [];
  await new ReadableStream({
    pull(controller) {
      if (blocks.length) {
        controller.enqueue(blocks.shift());
      } else {
        controller.close();
      }
    },
  })
    .pipeThrough(new CAREncoderStream([rootCID]))
    .pipeTo(
      new WritableStream({
        write(chunk) {
          chunks.push(chunk);
        },
      }),
    );
  const car = new Blob(chunks);
  return { cid: rootCID.toString(), car };
}

export async function listCar(car: Uint8Array) {
  const iterable = await CarIndexer.fromBytes(car);
  const index = new Map<string, { blockLength: number; blockOffset: number }>();
  const order: string[] = [];
  for await (const { cid, blockLength, blockOffset } of iterable) {
    const cidStr = cid.toString();
    index.set(cidStr, { blockLength, blockOffset });
    order.push(cidStr);
  }
  const roots = await iterable.getRoots();
  const entryIterable = recursive(roots[0], {
    get(cid) {
      const { blockOffset, blockLength } = index.get(cid.toString())!;
      return car.slice(blockOffset, blockOffset + blockLength);
    },
  });
  const entries: UnixFSEntry[] = [];
  for await (const entry of entryIterable) {
    entries.push(entry);
  }
  return entries;
}
