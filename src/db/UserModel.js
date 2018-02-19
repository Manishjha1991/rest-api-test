import BaseModel from "./BaseModel";
import { ApplicationError } from "../lib/errors";
import { filterFields } from "../lib/filter";
import { default as userSchema } from "../schemas/user.schema.js";
import * as constants from "../lib/constants";

export default class userModel extends BaseModel {
  constructor(connection) {
    super("user", connection);
    this.schema = userSchema;
    this.name = "user";
    this.model = this.connection.model(this.name, this.schema);
  }
  async create(userInformation) {
    try {
      const user = await this.model.create(userInformation);
      if (!user) {
        return null;
      }
      const PUBLIC_FIELDS = [
        "_id",
        "avatar",
        "firstName",
        "lastName",
        "userType"
      ];
      return filterFields(user, PUBLIC_FIELDS);
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }

  async get(userInformation) {
    try {
      let { phoneNumber } = userInformation;
      const user = await this.model
        .find({
          phoneNumber: phoneNumber
        })
        .lean();
      if (!user[0]) {
        return null;
      } else {
        return user[0];
      }
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
}
