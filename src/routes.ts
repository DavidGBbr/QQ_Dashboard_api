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
import { DeleteUserController } from "./controller/user/DeleteUserController";
import { UpdateUserController } from "./controller/user/UpdateUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ListProfileController } from "./controller/profile/ListProfileController";
import { UpdateTransactionController } from "./controller/transaction/UpdateTransactionController";
import { GetUserController } from "./controller/user/GetUserController";

export const router = Router();

//User
router.post("/session", new AuthUserController().handle);
router.post("/user", isAuthenticated, new CreateUserController().handle);
router.get("/user", isAuthenticated, new ListUserController().handle);
router.get("/users/:user_id", isAuthenticated, new GetUserController().handle);
router.delete("/user", isAuthenticated, new DeleteUserController().handle);
router.patch("/user", isAuthenticated, new UpdateUserController().handle);

//Profile
router.get("/profile", isAuthenticated, new ListProfileController().handle);

//Module
router.post("/module", isAuthenticated, new CreateModuleController().handle);
router.get("/module", isAuthenticated, new ListModuleController().handle);

//Transaction
router.post(
  "/transaction",
  isAuthenticated,
  new CreateTransactionController().handle
);
router.get("/transaction", new ListTransactionController().handle);
router.put("/transaction", new UpdateTransactionController().handle);

//Function
router.post(
  "/function",
  isAuthenticated,
  new CreateFunctionController().handle
);
router.get("/function", isAuthenticated, new ListFunctionController().handle);
