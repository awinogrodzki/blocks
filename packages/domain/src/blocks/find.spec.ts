import { createBlock } from "./create";
import { findBlock } from "./find";

describe("find", () => {
  it("should return a block found in list", () => {
    const blocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
    ];

    expect(findBlock(blocks, "block-2")).toEqual(
      createBlock("block-2", "content-2")
    );
  });

  it("should return a null when element is not found", () => {
    const blocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
    ];

    expect(findBlock(blocks, "block-3")).toBe(null);
  });
});
