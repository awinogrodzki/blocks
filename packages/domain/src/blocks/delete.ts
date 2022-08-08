import { Block } from "./types";

export const deleteBlocks = (
  blocks: Block[],
  blockIds: string[]
): Block[] => {
  if (blocks.length === 0) {
    return blocks;
  }

  const newBlocks = blocks.filter((block) => !blockIds.includes(block.id));

  return newBlocks.map((block) => ({
    ...block,
    blocks: deleteBlocks(block.blocks, blockIds),
  }));
};
