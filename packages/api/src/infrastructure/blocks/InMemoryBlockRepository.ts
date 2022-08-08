import {
  Block,
  BlockRepository,
  deleteBlocks,
  duplicateBlock,
  findBlock,
  insertBlocks,
  moveBlock,
} from "@blocks/domain";

export class InMemoryBlockRepository implements BlockRepository {
  constructor(private blocks: Block[]) {}

  public async getAll(): Promise<Block[]> {
    return this.blocks;
  }

  public async insert(blocks: Block[]) {
    this.blocks = insertBlocks(this.blocks, blocks);
  }

  public async delete(blockIds: string[]) {
    this.blocks = deleteBlocks(this.blocks, blockIds);
  }

  public async duplicate(blockId: string) {
    this.blocks = duplicateBlock(this.blocks, blockId);
  }

  public async move(
    blockId: string,
    targetIndex: number,
    parentId: string | null
  ) {
    const block = findBlock(this.blocks, blockId);

    if (!block) {
      return;
    }

    this.blocks = moveBlock(this.blocks, block, targetIndex, parentId);
  }
}
