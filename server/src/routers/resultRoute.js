import express from "express";
const router = express.Router();

import { getResults, createResult } from "../controllers/resultController.js";

router.route("/").post(createResult);
router.route("/:id").get(getResults);

export { router as resultRoute };
