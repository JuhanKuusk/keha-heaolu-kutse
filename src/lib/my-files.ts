import { createStore, get, set, del, keys } from "idb-keyval";

export type MyFile = {
  id: string;
  name: string;
  type: string; // e.g. image/png
  size: number; // in bytes
  createdAt: number; // epoch ms
  blob: Blob;
};

const store = createStore("my-files-db", "files");

const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export async function saveImage(blob: Blob, name: string): Promise<MyFile> {
  const file: MyFile = {
    id: genId(),
    name,
    type: blob.type || "image/png",
    size: blob.size,
    createdAt: Date.now(),
    blob,
  };
  await set(file.id, file, store);
  return file;
}

export async function listImages(): Promise<MyFile[]> {
  const allKeys = await keys(store);
  const result: MyFile[] = [];
  for (const k of allKeys) {
    const item = await get<MyFile>(k as string, store);
    if (item) result.push(item);
  }
  // Newest first
  result.sort((a, b) => b.createdAt - a.createdAt);
  return result;
}

export async function deleteImage(id: string): Promise<void> {
  await del(id, store);
}
