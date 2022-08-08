import { Block } from "./types";
import { deleteBlocks } from "./delete";

const insertBlockAtIndex = (blocks: Block[], block: Block, index: number) => {
  const left = blocks.slice(0, index);
  const right = blocks.slice(index);

  return [...left, block, ...right];
};

export const moveBlock = (
  blocks: Block[],
  block: Block,
  targetIndex: number,
  parentId: string | null
): Block[] => {
  if (!blocks.length) {
    return blocks;
  }

  const newBlocks = deleteBlocks(blocks, [block.id]);

  if (!parentId) {
    return insertBlockAtIndex(newBlocks, block, targetIndex);
  }

  const parentIndex = newBlocks.findIndex((block) => block.id === parentId);
  const parent = newBlocks[parentIndex];

  if (parent) {
    const left = newBlocks.slice(0, parentIndex);
    const right = newBlocks.slice(parentIndex + 1);

    return [
      ...left,
      {
        ...parent,
        blocks: insertBlockAtIndex(parent.blocks, block, targetIndex),
      },
      ...right,
    ];
  }

  return blocks.map((block) => ({
    ...block,
    blocks: moveBlock(block.blocks, block, targetIndex, parentId),
  }));
};
