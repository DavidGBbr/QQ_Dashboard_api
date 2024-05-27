import { Router, Request, Response } from "express";
import { CreateModuleController } from "./controller/module/CreateModuleController";
import { ListModuleController } from "./controller/module/ListModuleController";

export const router = Router();

router.post("/module", new CreateModuleController().handle);
router.get("/module", new ListModuleController().handle);
