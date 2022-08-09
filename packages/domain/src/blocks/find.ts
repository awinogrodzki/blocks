import { Block } from "./types";

export const findBlock = (blocks: Block[], blockId: string): Block | null => {
  if (!blocks.length) {
    return null;
  }

  const block = blocks.find((block) => block.id === blockId);

  if (block) {
    return block;
  }

  return findBlock(
    blocks.flatMap((block) => block.blocks),
    blockId
  );
};

export const hasBlock = (blocks: Block[], blockId: string): boolean => {
  if (!blocks.length) {
    return false;
  }

  if (blocks.some((block) => block.id === blockId)) {
    return true;
  }

  return blocks.some((block) => hasBlock(block.blocks, blockId));
};
