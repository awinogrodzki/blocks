import { Block } from "@blocks/domain";

const API_URL = "http://localhost:8080";

export const getAllBlocks = async (): Promise<Block[]> => {
  const response = await fetch(`${API_URL}/api/blocks`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message ?? "unknown error");
  }

  return response.json();
};

export const insertBlocks = async (blocks: Block[]): Promise<Block[]> => {
  const response = await fetch(`${API_URL}/api/blocks`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blocks),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message ?? "unknown error");
  }

  return response.json();
};

export const deleteBlocks = async (blockIds: string[]): Promise<Block[]> => {
  const response = await fetch(`${API_URL}/api/blocks`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blockIds),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message ?? "unknown error");
  }

  return response.json();
};

export const duplicateBlock = async (blockId: string): Promise<Block[]> => {
  const response = await fetch(`${API_URL}/api/blocks/${blockId}/duplicate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message ?? "unknown error");
  }

  return response.json();
};

export const moveBlock = async (
  blockId: string,
  targetIndex: number,
  parentId: string | null
): Promise<Block[]> => {
  const response = await fetch(`${API_URL}/api/blocks/${blockId}/move`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      targetIndex,
      parentId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message ?? "unknown error");
  }

  return response.json();
};
