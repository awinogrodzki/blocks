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
