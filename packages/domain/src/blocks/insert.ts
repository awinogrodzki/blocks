import { Block } from "./types";
import { hasBlock } from "./find";
import { BlockAlreadyExistsError } from "./errors";

export const insertBlocks = (prevBlocks: Block[], newBlocks: Block[]) => {
  if (newBlocks.some((newBlock) => hasBlock(prevBlocks, newBlock.id))) {
    throw new BlockAlreadyExistsError(
      `A block with provided id already exists`
    );
  }

  return prevBlocks.concat(newBlocks);
};
