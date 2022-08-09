import Joi from "joi";

const deleteSchema = Joi.array().items(Joi.string()).required();

export const parseDeleteBody = (body: any): string[] => {
  const result = deleteSchema.validate(body);

  if (result.error) {
    throw result.error;
  }

  return body;
};
