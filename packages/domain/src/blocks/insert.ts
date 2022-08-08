import { Block } from "./types";

export const insertBlocks = (prevBlocks: Block[], newBlocks: Block[]) => {
  return prevBlocks.concat(newBlocks);
}
