export interface Block {
  id: string;
  content: string;
  blocks: Block[];
}

export interface BlockRepository {
  getAll: () => Promise<Block[]>;
  insert: (blocks: Block[]) => Promise<void>;
  delete: (blockIds: string[]) => Promise<void>;
  duplicate: (blockId: string) => Promise<void>;
  move: (
    blockId: string,
    targetIndex: number,
    parentId: string | null
  ) => Promise<void>;
}
