import { route } from "./";
import { hashPassword, comparePassword } from "../lib/crypto";
import { generateToken } from "../lib/token";
import UserModel from "../db/UserModel";
import { ApplicationError } from "../lib/errors";
import _ from "lodash";

export const create = route(async (req, res) => {
  const userModel = new UserModel();
  try {
    const userInformation = req.body;
    let { password } = req.body;

    let newUser = Object.assign({}, userInformation, {
      password: await hashPassword(password)
    });

    if (!_.isEmpty(newUser)) {
      console.log(newUser);
      const user = await userModel.create(newUser);
      let { _id } = user;
      let newUserWithAuthToken = Object.assign({}, user, {
        token: await generateToken(_id)
      });
      res.send({ results: newUserWithAuthToken });
    } else {
      throw new ApplicationError("No userInformation Provided !!!", 501, {});
    }
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});

export const get = route(async (req, res) => {
  const userModel = new UserModel();
  try {
    const user = await userModel.get(req.body);
    let { password, _id } = user;
    let checkPassword = await comparePassword(req.body.password, password);
    if (checkPassword) {
      let userWithAuthToken = Object.assign({}, user, {
        token: await generateToken(_id)
      });
      const PUBLIC_FIELDS = ["_id", "avatar", "firstName", "lastName", "token"];
      res.send({ results: filterFields(userWithAuthToken, PUBLIC_FIELDS) });
    } else {
      throw new ApplicationError("Wrong password !!!", 501, {});
    }
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});
