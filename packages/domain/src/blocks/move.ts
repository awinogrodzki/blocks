import { Block } from "./types";
import { deleteBlocks } from "./delete";
import { findBlock } from "./find";
import { BlockNotFoundError, IncorrectRelationshipError } from "./errors";

const insertBlockAtIndex = (blocks: Block[], block: Block, index: number) => {
  const left = blocks.slice(0, index);
  const right = blocks.slice(index);

  return [...left, block, ...right];
};

const moveBlockRecursive = (
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

  return newBlocks.map((subblock) => ({
    ...subblock,
    blocks: moveBlockRecursive(subblock.blocks, block, targetIndex, parentId),
  }));
};

export const moveBlock = (
  blocks: Block[],
  blockId: string,
  targetIndex: number,
  parentId: string | null
): Block[] => {
  const block = findBlock(blocks, blockId);

  if (!block) {
    throw new BlockNotFoundError(
      `A block ${blockId} cannot be found in a provided block list.`
    );
  }

  if (parentId === block.id) {
    throw new IncorrectRelationshipError(
      `A block cannot be a parent of itself`
    );
  }

  if (parentId && findBlock(block.blocks, parentId)) {
    throw new IncorrectRelationshipError(
      `A block cannot have a parent that is one of it\'s subblocks`
    );
  }

  return moveBlockRecursive(blocks, block, targetIndex, parentId);
};
