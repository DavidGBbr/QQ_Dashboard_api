import { Router, Request, Response } from "express";
import { CreateModuleController } from "./controller/module/CreateModuleController";

export const router = Router();

router.post("/module", new CreateModuleController().handle);
