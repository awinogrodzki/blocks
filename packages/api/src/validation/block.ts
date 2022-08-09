import Joi from "joi";

export const blockSchema = Joi.object({
  id: Joi.string().required(),
  content: Joi.string().required(),
  blocks: Joi.array().items(Joi.link("#block")).required(),
}).id("block");
