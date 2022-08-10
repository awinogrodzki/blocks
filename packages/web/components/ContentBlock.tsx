import * as React from "react";
import { Block } from "@blocks/domain";

interface ContentBlockProps {
  block: Block;
  onMove: (blockId: string, parentId: string) => void;
}

export const ContentBlock = ({ block, onMove }: ContentBlockProps) => {
  function handleDragStart(e: React.DragEvent) {
    e.stopPropagation();
    e.dataTransfer.setData("application/json", JSON.stringify(block));
  }

  function handleDragOver(e: React.DragEvent) {
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  function handleDrop(e: React.DragEvent) {
    e.stopPropagation();
    const blockToMove = JSON.parse(
      e.dataTransfer.getData("application/json")
    ) as Block;

    onMove(blockToMove.id, block.id);
  }

  return (
    <div
      draggable
      style={{
        backgroundColor: "#fff",
        padding: "1rem",
        borderRadius: "4px",
        border: "1px solid #eee",
        marginBottom: "0.5rem",
      }}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
    >
      <span>{block.content}</span>
      {block.blocks.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          {block.blocks.map((subblock) => (
            <ContentBlock key={subblock.id} block={subblock} onMove={onMove} />
          ))}
        </div>
      )}
    </div>
  );
};
