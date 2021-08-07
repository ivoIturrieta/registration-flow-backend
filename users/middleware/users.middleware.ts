import express from "express";
import usersService from "../services/users.service";
import userService from "../services/users.service";
import * as argon2 from "argon2";

class UsersMiddleware {
  async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.getUserByEmail(req.body.email);
    if (user) {
      res.status(400).send({ errors: ["User email already exists"] });
    } else {
      next();
    }
  }

  async createUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.password = await argon2.hash(req.body.password);
    await usersService.create(req.body);
    next();
  }
}

export default new UsersMiddleware();
