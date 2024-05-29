import { Router, Request, Response } from "express";
import { CreateModuleController } from "./controller/module/CreateModuleController";
import { ListModuleController } from "./controller/module/ListModuleController";
import { CreateTransactionController } from "./controller/transaction/CreateTransactionController";
import { ListTransactionController } from "./controller/transaction/ListTransactionController";

export const router = Router();

//Module
router.post("/module", new CreateModuleController().handle);
router.get("/module", new ListModuleController().handle);

//Transaction
router.post("/transaction", new CreateTransactionController().handle);
router.get("/transaction", new ListTransactionController().handle);
