import { createBlock } from "./create";
import { insertBlocks } from "./insert";

describe("insertion", () => {
  it("inserts new blocks at the end of previous blocks list", () => {
    const prevBlocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
    ];

    const newBlocks = [
      createBlock("block-3", "content-3"),
      createBlock("block-4", "content-4"),
    ];

    expect(insertBlocks(prevBlocks, newBlocks)).toEqual([
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
      createBlock("block-3", "content-3"),
      createBlock("block-4", "content-4"),
    ]);
  });

  it("throws error if there is already a block with given id", () => {
    const prevBlocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
    ];

    const newBlocks = [
      createBlock("block-3", "content-3"),
      createBlock("block-2", "content-4"),
    ];

    expect(() => insertBlocks(prevBlocks, newBlocks)).toThrow(
      "A block with provided id already exists"
    );
  });
});
