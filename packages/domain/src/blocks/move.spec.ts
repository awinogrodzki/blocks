import { createBlock } from "./create";
import { moveBlock } from "./move";

describe("move", () => {
  it("moves block to a different index of the same list", () => {
    const blocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
      createBlock("block-3", "content-3"),
    ];

    expect(moveBlock(blocks, "block-2", 2, null)).toEqual([
      createBlock("block-1", "content-1"),
      createBlock("block-3", "content-3"),
      createBlock("block-2", "content-2"),
    ]);
  });

  it("moves block to a different parent", () => {
    const blocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
      createBlock("block-3", "content-3"),
    ];

    expect(moveBlock(blocks, "block-3", 0, "block-2")).toEqual([
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2", [
        createBlock("block-3", "content-3"),
      ]),
    ]);
  });

  it("moves block to a specific position in parent block list", () => {
    const blocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2", [
        createBlock("block-3", "content-3"),
        createBlock("block-4", "content-4"),
        createBlock("block-5", "content-5"),
      ]),
    ];

    expect(moveBlock(blocks, "block-1", 1, "block-2")).toEqual([
      createBlock("block-2", "content-2", [
        createBlock("block-3", "content-3"),
        createBlock("block-1", "content-1"),
        createBlock("block-4", "content-4"),
        createBlock("block-5", "content-5"),
      ]),
    ]);
  });

  it("moves block from subblocks to a root block list", () => {
    const blocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2", [
        createBlock("block-3", "content-3"),
        createBlock("block-4", "content-4"),
        createBlock("block-5", "content-5"),
      ]),
    ];

    expect(moveBlock(blocks, "block-3", 2, null)).toEqual([
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2", [
        createBlock("block-4", "content-4"),
        createBlock("block-5", "content-5"),
      ]),
      createBlock("block-3", "content-3"),
    ]);
  });

  it("moves block from root to a subblocks subblock", () => {
    const blocks = [
      createBlock("block-1", "content-1", [
        createBlock("block-2", "content-2"),
      ]),
      createBlock("block-3", "content-3"),
    ];

    expect(moveBlock(blocks, "block-3", 0, "block-2")).toEqual([
      createBlock("block-1", "content-1", [
        createBlock("block-2", "content-2", [
          createBlock("block-3", "content-3"),
        ]),
      ]),
    ]);
  });

  it("throws not found error if block that should be moved does not exist", () => {
    const blocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
    ];

    expect(() => moveBlock(blocks, "block-3", 0, null)).toThrow(
      "A block block-3 cannot be found in a provided block list."
    );
  });

  it("throws incorrect relationship error if user tries to move block inside one of it's children", () => {
    const blocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2", [
        createBlock("block-3", "content-3"),
      ]),
    ];

    expect(() => moveBlock(blocks, "block-2", 0, "block-3")).toThrow(
      "A block cannot have a parent that is one of it's subblocks"
    );
  });

  it("throws incorrect relationship error if user tries to make block a parent of itself", () => {
    const blocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
    ];

    expect(() => moveBlock(blocks, "block-2", 0, "block-2")).toThrow(
      "A block cannot be a parent of itself"
    );
  });
});
