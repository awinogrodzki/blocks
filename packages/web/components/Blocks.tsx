import * as React from "react";
import { ContentBlock } from "./ContentBlock";
import { BlockInput } from "./BlockInput";
import { Block } from "@blocks/domain";
import { insertBlocks, moveBlock } from "../api";

interface BlocksProps {
  blocks: Block[];
}

export const Blocks = ({ blocks: initialBlocks }: BlocksProps) => {
  const [blocks, setBlocks] = React.useState(initialBlocks);
  const handleInsert = async (block: Block) => {
    setBlocks(await insertBlocks([block]));
  };

  const handleMove = async (blockId: string, parentId: string) => {
    setBlocks(await moveBlock(blockId, 0, parentId));
  };

  return (
    <div>
      {blocks.map((block) => (
        <ContentBlock onMove={handleMove} key={block.id} block={block} />
      ))}
      <BlockInput onSubmit={handleInsert} />
    </div>
  );
};
