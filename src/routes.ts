import { Router, Request, Response } from "express";
import { CreateModuleController } from "./controller/module/CreateModuleController";
import { ListModuleController } from "./controller/module/ListModuleController";
import { CreateTransactionController } from "./controller/transaction/CreateTransactionController";
import { ListTransactionController } from "./controller/transaction/ListTransactionController";
import { CreateFunctionController } from "./controller/function/CreateFunctionController";
import { ListFunctionController } from "./controller/function/ListFunctionController";
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserController";
import { ListUserController } from "./controller/user/ListUserController";

export const router = Router();

//User
router.post("/user", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/user", new ListUserController().handle);

//Module
router.post("/module", new CreateModuleController().handle);
router.get("/module", new ListModuleController().handle);

//Transaction
router.post("/transaction", new CreateTransactionController().handle);
router.get("/transaction", new ListTransactionController().handle);

//Function
router.post("/function", new CreateFunctionController().handle);
router.get("/function", new ListFunctionController().handle);
