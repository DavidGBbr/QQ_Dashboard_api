import { Router } from "express";
import { CreateModuleController } from "./controller/module/CreateModuleController";
import { ListModuleController } from "./controller/module/ListModuleController";
import { CreateTransactionController } from "./controller/transaction/CreateTransactionController";
import { ListTransactionController } from "./controller/transaction/ListTransactionController";
import { CreateFunctionController } from "./controller/function/CreateFunctionController";
import { ListFunctionController } from "./controller/function/ListFunctionController";
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserController";
import { ListUserController } from "./controller/user/ListUserController";
import { DeleteUserController } from "./controller/user/DeleteUserController";
import { UpdateUserController } from "./controller/user/UpdateUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ListProfileController } from "./controller/profile/ListProfileController";
import { UpdateTransactionController } from "./controller/transaction/UpdateTransactionController";
import { GetUserController } from "./controller/user/GetUserController";
import { GetModuleController } from "./controller/module/GetModuleController";
import { UpdateModuleController } from "./controller/module/UpdateModuleController";
import { DeleteTransactionController } from "./controller/transaction/DeleteTransactionController";
import { GetTransactionController } from "./controller/transaction/GetTransactionController";
import { CreateProfileController } from "./controller/profile/CreateProfileController";
import { UpdateFunctionController } from "./controller/function/UpdateFunctionController";

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
router.put("/function", new UpdateFunctionController().handle);
