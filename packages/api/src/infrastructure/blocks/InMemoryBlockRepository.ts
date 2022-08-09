import {
  Block,
  BlockRepository,
  deleteBlocks,
  duplicateBlock,
  insertBlocks,
  moveBlock,
} from "@blocks/domain";

export class InMemoryBlockRepository implements BlockRepository {
  constructor(private blocks: Block[]) {}

  public async getAll(): Promise<Block[]> {
    return this.blocks;
  }

  public async insert(blocks: Block[]) {
    return (this.blocks = insertBlocks(this.blocks, blocks));
  }

  public async delete(blockIds: string[]) {
    return (this.blocks = deleteBlocks(this.blocks, blockIds));
  }

  public async duplicate(blockId: string) {
    return (this.blocks = duplicateBlock(this.blocks, blockId));
  }

  public async move(
    blockId: string,
    targetIndex: number,
    parentId: string | null
  ) {
    return (this.blocks = moveBlock(
      this.blocks,
      blockId,
      targetIndex,
      parentId
    ));
  }
}
