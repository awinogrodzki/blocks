import express from "express";
import cors from "cors";
import { InMemoryBlockRepository } from "./infrastructure/blocks/InMemoryBlockRepository";
import { parseInsertBody } from "./validation/insert";
import { parseDeleteBody } from "./validation/delete";
import { parseMoveBody } from "./validation/move";
import { errorHandler } from "./errors";
import { BlockRepository } from "@blocks/domain";

const app = express();
const repository: BlockRepository = new InMemoryBlockRepository([]);

app.use(cors());
app.use(express.json());

app.get("/api/blocks", async function (req, res, next) {
  try {
    res.json(await repository.getAll());
  } catch (e) {
    next(e);
  }
});

app.post("/api/blocks", async function (req, res, next) {
  try {
    const blocks = parseInsertBody(req.body);
    res.json(await repository.insert(blocks));
  } catch (e) {
    next(e);
  }
});

app.delete("/api/blocks", async function (req, res, next) {
  try {
    const ids = parseDeleteBody(req.body);
    res.json(await repository.delete(ids));
  } catch (e) {
    next(e);
  }
});

app.post("/api/blocks/:id/duplicate", async function (req, res, next) {
  try {
    res.json(await repository.duplicate(req.params.id));
  } catch (e) {
    next(e);
  }
});

app.post("/api/blocks/:id/move", async function (req, res, next) {
  try {
    const { targetIndex, parentId } = parseMoveBody(req.body);
    res.json(await repository.move(req.params.id, targetIndex, parentId));
  } catch (e) {
    next(e);
  }
});

app.use(errorHandler);

app.listen(8080, () => {
  console.log(`> API ready on http://localhost:8080`);
});
