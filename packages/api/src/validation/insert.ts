import Joi from "joi";
import { blockSchema } from "./block";
import { Block } from "@blocks/domain";

const insertSchema = Joi.array().items(blockSchema).required();

export const parseInsertBody = (body: any): Block[] => {
  const result = insertSchema.validate(body);

  if (result.error) {
    throw result.error;
  }

  return body;
};
