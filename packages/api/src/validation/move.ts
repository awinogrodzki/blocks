import Joi from "joi";

const moveSchema = Joi.object({
  targetIndex: Joi.number().required(),
  parentId: Joi.string().required().allow(null),
}).required();

export const parseMoveBody = (
  body: any
): { targetIndex: number; parentId: string | null } => {
  const result = moveSchema.validate(body);

  if (result.error) {
    throw result.error;
  }

  return body;
};
