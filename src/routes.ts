import { Router } from "express";

import { AuthUserController } from "./controller/user/AuthUserController";
import { CreateUserController } from "./controller/user/CreateUserController";
import { CreateProfileController } from "./controller/profile/CreateProfileController";
import { CreateModuleController } from "./controller/module/CreateModuleController";
import { CreateTransactionController } from "./controller/transaction/CreateTransactionController";
import { CreateFunctionController } from "./controller/function/CreateFunctionController";

import { GetUserController } from "./controller/user/GetUserController";
import { GetProfileController } from "./controller/profile/GetProfileController";
import { GetModuleController } from "./controller/module/GetModuleController";
import { GetTransactionController } from "./controller/transaction/GetTransactionController";
import { GetFunctionController } from "./controller/function/GetFunctionController";

import { ListUserController } from "./controller/user/ListUserController";
import { ListProfileController } from "./controller/profile/ListProfileController";
import { ListModuleController } from "./controller/module/ListModuleController";
import { ListTransactionController } from "./controller/transaction/ListTransactionController";
import { ListFunctionController } from "./controller/function/ListFunctionController";

import { UpdateUserController } from "./controller/user/UpdateUserController";
import { UpdatePasswordController } from "./controller/user/UpdatePasswordController";
import { UpdateProfileController } from "./controller/profile/UpdateProfileController.ts";
import { UpdateModuleController } from "./controller/module/UpdateModuleController";
import { UpdateTransactionController } from "./controller/transaction/UpdateTransactionController";
import { UpdateFunctionController } from "./controller/function/UpdateFunctionController";

import { DeleteUserController } from "./controller/user/DeleteUserController";
import { DeleteTransactionController } from "./controller/transaction/DeleteTransactionController";
import { DeleteFunctionController } from "./controller/function/DeleteFunctionController";

import { DeleteProfileController } from "./controller/profile/DeleteProfileController";
import { DeleteModuleController } from "./controller/module/DeleteModuleController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

export const router = Router();

//User
router.post("/session", new AuthUserController().handle);
router.post("/user", isAuthenticated, new CreateUserController().handle);
router.get("/user", isAuthenticated, new ListUserController().handle);
router.get("/users/:user_id", isAuthenticated, new GetUserController().handle);
router.delete(
  "/user/:user_id",
  isAuthenticated,
  new DeleteUserController().handle
);
router.patch("/user", isAuthenticated, new UpdateUserController().handle);
router.patch(
  "/forget/:token",
  isAuthenticated,
  new UpdatePasswordController().handle
);

//Profile
router.post(
  "/profile",
  isAuthenticated,
  isAuthenticated,
  isAuthenticated,
  new CreateProfileController().handle
);
router.get(
  "/profile",
  isAuthenticated,
  isAuthenticated,
  isAuthenticated,
  new ListProfileController().handle
);
router.get(
  "/profile/:profile_id",
  isAuthenticated,
  isAuthenticated,
  isAuthenticated,
  new GetProfileController().handle
);
router.patch(
  "/profile",
  isAuthenticated,
  isAuthenticated,
  isAuthenticated,
  new UpdateProfileController().handle
);
router.delete(
  "/profile/:profile_id",
  isAuthenticated,
  isAuthenticated,
  isAuthenticated,
  new DeleteProfileController().handle
);

//Module
router.post(
  "/module",
  isAuthenticated,
  isAuthenticated,
  new CreateModuleController().handle
);
router.get(
  "/module",
  isAuthenticated,
  isAuthenticated,
  new ListModuleController().handle
);
router.get(
  "/module/:module_id",
  isAuthenticated,
  isAuthenticated,
  new GetModuleController().handle
);
router.patch(
  "/module",
  isAuthenticated,
  isAuthenticated,
  new UpdateModuleController().handle
);
router.delete(
  "/module/:module_id",
  isAuthenticated,
  isAuthenticated,
  new DeleteModuleController().handle
);

//Transaction
router.post(
  "/transaction",
  isAuthenticated,
  new CreateTransactionController().handle
);
router.get(
  "/transaction",
  isAuthenticated,
  new ListTransactionController().handle
);
router.get(
  "/transaction/:transaction_id",
  isAuthenticated,
  new GetTransactionController().handle
);
router.put(
  "/transaction",
  isAuthenticated,
  new UpdateTransactionController().handle
);
router.delete(
  "/transaction/:transaction_id",
  isAuthenticated,
  new DeleteTransactionController().handle
);

//Function
router.post(
  "/function",
  isAuthenticated,
  new CreateFunctionController().handle
);
router.get("/function", isAuthenticated, new ListFunctionController().handle);
router.get(
  "/function/:function_id",
  isAuthenticated,
  new GetFunctionController().handle
);
router.put("/function", isAuthenticated, new UpdateFunctionController().handle);
router.delete(
  "/function/:function_id",
  isAuthenticated,
  new DeleteFunctionController().handle
);
