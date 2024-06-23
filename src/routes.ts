import { Router } from "express";

import { AuthUserController } from "./controller/user/AuthUserController";
import { CreateUserController } from "./controller/user/CreateUserController";
import { CreateProfileController } from "./controller/profile/CreateProfileController";
import { CreateModuleController } from "./controller/module/CreateModuleController";
import { CreateTransactionController } from "./controller/transaction/CreateTransactionController";
import { CreateFunctionController } from "./controller/function/CreateFunctionController";

import { GetUserController } from "./controller/user/GetUserController";
import { GetModuleController } from "./controller/module/GetModuleController";
import { GetTransactionController } from "./controller/transaction/GetTransactionController";
import { GetFunctionController } from "./controller/function/GetFunctionController";

import { ListUserController } from "./controller/user/ListUserController";
import { ListProfileController } from "./controller/profile/ListProfileController";
import { ListModuleController } from "./controller/module/ListModuleController";
import { ListTransactionController } from "./controller/transaction/ListTransactionController";
import { ListFunctionController } from "./controller/function/ListFunctionController";

import { UpdateUserController } from "./controller/user/UpdateUserController";
import { UpdateModuleController } from "./controller/module/UpdateModuleController";
import { UpdateTransactionController } from "./controller/transaction/UpdateTransactionController";
import { UpdateFunctionController } from "./controller/function/UpdateFunctionController";

import { DeleteUserController } from "./controller/user/DeleteUserController";
import { DeleteTransactionController } from "./controller/transaction/DeleteTransactionController";
import { DeleteFunctionController } from "./controller/function/DeleteFunctionController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

export const router = Router();

//User
router.post("/session", new AuthUserController().handle);
router.post("/user", new CreateUserController().handle);
router.get("/user", new ListUserController().handle);
router.get("/users/:user_id", new GetUserController().handle);
router.delete("/user/:user_id", new DeleteUserController().handle);
router.patch("/user", new UpdateUserController().handle);

//Profile
router.post("/profile", new CreateProfileController().handle);
router.get("/profile", new ListProfileController().handle);

//Module
router.post("/module", new CreateModuleController().handle);
router.get("/module", new ListModuleController().handle);
router.get("/module/:module_id", new GetModuleController().handle);
router.patch("/module", new UpdateModuleController().handle);

//Transaction
router.post("/transaction", new CreateTransactionController().handle);
router.get("/transaction", new ListTransactionController().handle);
router.get(
  "/transaction/:transaction_id",
  new GetTransactionController().handle
);
router.put("/transaction", new UpdateTransactionController().handle);
router.delete(
  "/transaction/:transaction_id",
  new DeleteTransactionController().handle
);

//Function
router.post("/function", new CreateFunctionController().handle);
router.get("/function", new ListFunctionController().handle);
router.get("/function/:function_id", new GetFunctionController().handle);
router.put("/function", new UpdateFunctionController().handle);
router.delete("/function/:function_id", new DeleteFunctionController().handle);
