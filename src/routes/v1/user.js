import express from "express";
const router = express.Router();

import { createNewUser, login } from "../../controllers/AuthController";
import {
  validateCreateUser,
  validateUserLogin,
} from "../../middlewares/validations/user";

router.route("/user").post(validateCreateUser, createNewUser);
router.route("/user/login").post(validateUserLogin, login);
// router.route.get("/user", getAllUserType);
// router.post("/", createUserType);
// router.patch("/", updateUserType);
// router.get("/:id", findUserTypeById);
// router.post("/name", findUserTypeByName);

export default router;
