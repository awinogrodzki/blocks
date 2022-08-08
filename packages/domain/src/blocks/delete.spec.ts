import { createBlock } from "./create";
import { deleteBlocks } from "./delete";

describe("deletion", () => {
  it("deletes a block with given id", () => {
    const blocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
      createBlock("block-3", "content-3"),
    ];

    expect(deleteBlocks(blocks, ["block-2"])).toEqual([
      createBlock("block-1", "content-1"),
      createBlock("block-3", "content-3"),
    ]);
  });

  it("deletes multiple blocks with given ids", () => {
    const blocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
      createBlock("block-3", "content-3"),
    ];

    expect(deleteBlocks(blocks, ["block-2", "block-1"])).toEqual([
      createBlock("block-3", "content-3"),
    ]);
  });

  it("deletes a nested block", () => {
    const blocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2", [
        createBlock("block-3", "content-3", [
          createBlock("block-4", "content-4"),
          createBlock("block-5", "content-5")
        ])
      ]),
    ];

    expect(deleteBlocks(blocks, ["block-4"])).toEqual([
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2", [
        createBlock("block-3", "content-3", [
          createBlock("block-5", "content-5")
        ])
      ]),
    ]);
  });

  it("deletes a block with all of it's children", () => {
    const blocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2", [
        createBlock("block-3", "content-3", [
          createBlock("block-4", "content-4"),
          createBlock("block-5", "content-5")
        ])
      ]),
    ];

    expect(deleteBlocks(blocks, ["block-3"])).toEqual([
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
    ]);
  });
});
