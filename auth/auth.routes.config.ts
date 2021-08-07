import { CommonRoutesConfig } from "../common/common.routes.config";
import authController from "./controllers/auth.controller";
import express from "express";
import BodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import { body } from "express-validator";
import usersMiddleware from "../users/middleware/users.middleware";
import authMiddleware from "./middleware/auth.middleware";

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes(): express.Application {
    this.app.post(`/auth`, [
      body("email").isEmail(),
      body("password")
        .isLength({ min: 8 })
        .withMessage("Must include password (8+ characters)"),
      body("name").isLength({ min: 5 }),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      usersMiddleware.validateSameEmailDoesntExist,
      usersMiddleware.createUser,
      authController.createJWT
    ]);

    this.app.post(`/login`, [
      body("email").isEmail(),
      body("password")
        .isLength({ min: 8 })
        .withMessage("Must include password (8+ characters)"),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      authMiddleware.verifyUserPassword,
      authController.createJWT
    ]);

    return this.app;
  }
}
