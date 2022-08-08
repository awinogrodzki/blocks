import { Block } from "./types";
import { createBlock } from "./create";
import { v4 } from "uuid";

const duplicateBlockWithSubBlocks = (block: Block): Block => {
  if (!block.blocks.length) {
    return createBlock(v4(), block.content, []);
  }

  return createBlock(
    v4(),
    block.content,
    block.blocks.map(duplicateBlockWithSubBlocks)
  );
};

export const duplicateBlock = (
  blocks: Block[],
  blockId: string
): Block[] => {
  if (blocks.length === 0) {
    return blocks;
  }

  const blockIndex = blocks.findIndex((block) => block.id === blockId);

  if (blockIndex > -1) {
    const block = blocks[blockIndex];

    const left = blocks.slice(0, blockIndex);
    const right = blocks.slice(blockIndex + 1);

    return [...left, block, duplicateBlockWithSubBlocks(block), ...right];
  }

  return blocks.map((block) => ({
    ...block,
    blocks: duplicateBlock(block.blocks, blockId),
  }));
};
