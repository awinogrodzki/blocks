export interface Block {
  id: string;
  content: string;
  blocks: Block[];
}

export interface BlockRepository {
  getAll: () => Promise<Block[]>;
  insert: (blocks: Block[]) => Promise<Block[]>;
  delete: (blockIds: string[]) => Promise<Block[]>;
  duplicate: (blockId: string) => Promise<Block[]>;
  move: (
    blockId: string,
    targetIndex: number,
    parentId: string | null
  ) => Promise<Block[]>;
}
