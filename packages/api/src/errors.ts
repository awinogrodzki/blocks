import { ErrorRequestHandler } from "express";
import { ValidationError } from "joi";
import {
  BlockAlreadyExistsError,
  BlockNotFoundError,
  IncorrectRelationshipError,
} from "@blocks/domain/dist/blocks/errors";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  switch (err.constructor) {
    case BlockNotFoundError:
      return res.status(404).json({ message: err.message });
    case BlockAlreadyExistsError:
      return res.status(409).json({ message: err.message });
    case ValidationError:
    case IncorrectRelationshipError:
      return res.status(422).json({ message: err.message });
    default:
      return res.status(500).json({ message: "Internal server error" });
  }
};
