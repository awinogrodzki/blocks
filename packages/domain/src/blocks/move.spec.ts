import { createBlock } from "./create";
import { moveBlock } from "./move";

describe('move', () => {
  it('moves block to a different index of the same list', () => {
    const blocks = [
      createBlock('block-1', 'content-1'),
      createBlock('block-2', 'content-2'),
      createBlock('block-3', 'content-3'),
    ]

    expect(moveBlock(blocks, blocks[1], 2, null)).toEqual([
      createBlock('block-1', 'content-1'),
      createBlock('block-3', 'content-3'),
      createBlock('block-2', 'content-2'),
    ])
  })

  it('moves block to a different parent', () => {
    const blocks = [
      createBlock('block-1', 'content-1'),
      createBlock('block-2', 'content-2'),
      createBlock('block-3', 'content-3'),
    ]

    expect(moveBlock(blocks, blocks[2], 0, 'block-2')).toEqual([
      createBlock('block-1', 'content-1'),
      createBlock('block-2', 'content-2', [
        createBlock('block-3', 'content-3'),
      ]),
    ])
  })

  it('moves block to a specific position in parent block list', () => {
    const blocks = [
      createBlock('block-1', 'content-1'),
      createBlock('block-2', 'content-2', [
        createBlock('block-3', 'content-3'),
        createBlock('block-4', 'content-4'),
        createBlock('block-5', 'content-5'),
      ]),
    ]

    expect(moveBlock(blocks, blocks[0], 1, 'block-2')).toEqual([
      createBlock('block-2', 'content-2', [
        createBlock('block-3', 'content-3'),
        createBlock('block-1', 'content-1'),
        createBlock('block-4', 'content-4'),
        createBlock('block-5', 'content-5'),
      ]),
    ])
  })

  it('moves block from subblocks to a root block list', () => {
    const blocks = [
      createBlock('block-1', 'content-1'),
      createBlock('block-2', 'content-2', [
        createBlock('block-3', 'content-3'),
        createBlock('block-4', 'content-4'),
        createBlock('block-5', 'content-5'),
      ]),
    ]

    expect(moveBlock(blocks, blocks[1].blocks[0], 2, null)).toEqual([
      createBlock('block-1', 'content-1'),
      createBlock('block-2', 'content-2', [
        createBlock('block-4', 'content-4'),
        createBlock('block-5', 'content-5'),
      ]),
      createBlock('block-3', 'content-3'),
    ])
  })
})
