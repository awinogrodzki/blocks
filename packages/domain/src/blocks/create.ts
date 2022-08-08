import { Block } from "./types";

export const createBlock = (
  id: string,
  content: string,
  subBlocks: Block[] = []
): Block => {
  return {
    id,
    content,
    blocks: subBlocks,
  };
};
