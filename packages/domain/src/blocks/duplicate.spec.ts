import { duplicateBlock } from "./duplicate";
import { createBlock } from "./create";

jest.mock("uuid", () => ({
  v4: () => `random-id`,
}));

describe("duplication", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("duplicates specified block and puts it right after duplicated block", () => {
    const blocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
      createBlock("block-3", "content-3"),
    ];

    expect(duplicateBlock(blocks, "block-2")).toEqual([
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
      createBlock("random-id", "content-2"),
      createBlock("block-3", "content-3"),
    ]);
  });

  it("duplicates specified block along with all of its subblocks", () => {
    const blocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
      createBlock("block-3", "content-3", [
        createBlock("subblock-1", "subblock-content-1"),
        createBlock("subblock-2", "subblock-content-2"),
        createBlock("subblock-3", "subblock-content-3"),
      ]),
    ];

    expect(duplicateBlock(blocks, "block-3")).toEqual([
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
      createBlock("block-3", "content-3", [
        createBlock("subblock-1", "subblock-content-1"),
        createBlock("subblock-2", "subblock-content-2"),
        createBlock("subblock-3", "subblock-content-3"),
      ]),
      createBlock("random-id", "content-3", [
        createBlock("random-id", "subblock-content-1"),
        createBlock("random-id", "subblock-content-2"),
        createBlock("random-id", "subblock-content-3"),
      ]),
    ]);
  });

  it("duplicates block in one of the subblocks", () => {
    const blocks = [
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
      createBlock("block-3", "content-3", [
        createBlock("subblock-1", "subblock-content-1", [
          createBlock("subblock-2", "subblock-content-2", [
            createBlock("subblock-3", "subblock-content-3"),
          ]),
        ]),
      ]),
    ];

    expect(duplicateBlock(blocks, "subblock-2")).toEqual([
      createBlock("block-1", "content-1"),
      createBlock("block-2", "content-2"),
      createBlock("block-3", "content-3", [
        createBlock("subblock-1", "subblock-content-1", [
          createBlock("subblock-2", "subblock-content-2", [
            createBlock("subblock-3", "subblock-content-3"),
          ]),
          createBlock("random-id", "subblock-content-2", [
            createBlock("random-id", "subblock-content-3"),
          ]),
        ]),
      ]),
    ]);
  });
});
