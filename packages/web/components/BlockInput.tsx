import * as React from "react";
import { Block, createBlock } from "@blocks/domain";
import { v4 } from "uuid";

interface BlockInputProps {
  onSubmit: (block: Block) => void;
}

export const BlockInput = ({ onSubmit }: BlockInputProps) => {
  const [content, setContent] = React.useState("");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const block = createBlock(v4(), content);
    setContent("");
    onSubmit(block);
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <input
        style={{
          height: "30px",
          borderRadius: "4px",
          padding: "0.5rem",
          maxWidth: "100%",
          width: "240px",
        }}
        placeholder="Lorem ipsum dolor sit amet"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleClick}
        style={{ padding: "0.25rem", display: "inline-flex" }}
      >
        <svg
          width="1em"
          height="1em"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
        </svg>
      </button>
    </div>
  );
};
