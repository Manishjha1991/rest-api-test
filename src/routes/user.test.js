import UserModel from "../db/UserModel.js";
import { create, get } from "./user.js";
import { configurationFile } from "../lib/config";
import * as verify from "../lib/crypto";
import mongoose from "mongoose";
import { error } from "util";
let DEFAULT_TIMEOUT_INTERVAL = 100000;
let connection = null;
beforeEach(() => {
  connection = mongoose.createConnection(
    configurationFile[process.env["NODE_ENV"]].mongoUrl,
    async err => {
      if (err) {
        throw err;
      }
    }
  );
});

test("UserModel - createUser - happy path", async () => {
  UserModel.prototype.create = jest.fn();
  UserModel.prototype.create.mockReturnValue("user");
  const requestMock = {
    body: {
      userInformation: "some_user_related information",
      password: "123456"
    }
  };

  const send = jest.fn();
  const responseMock = {
    send
  };
  await create(requestMock, responseMock, jest.fn());
  expect(UserModel.prototype.create).toHaveBeenCalled();
  expect(responseMock.send).toHaveBeenCalled();
});
test("createStory - without json", async () => {
  const requestMock = "";
  const responseMock = "";
  try {
    await create(requestMock, responseMock, jest.fn());
  } catch (error) {
    expect(error).toMatch("501");
  }
});

test(
  "User - get - happy path",
  async () => {
    UserModel.prototype.get = jest.fn();
    UserModel.prototype.get.mockReturnValue("user");
    /* eslint-disable */
    verify.comparePassword = jest.fn().mockImplementation(() => true);
    /* eslint-enable */
    const requestMock = {
      body: {
        phoneNumber: "user's phoneNumber",
        password: "123456"
      }
    };
    const send = jest.fn();

    const responseMock = {
      send
    };
    await get(requestMock, responseMock, jest.fn());
    expect(UserModel.prototype.get).toHaveBeenCalledWith(requestMock.body);
    expect(verify.comparePassword).toHaveBeenCalled();
    // expect(responseMock.send).toHaveBeenCalled();
  },
  DEFAULT_TIMEOUT_INTERVAL
);
test(
  "User - get - without json",
  async () => {
    const requestMock = "";
    const responseMock = "";
    try {
      await get(requestMock, responseMock, jest.fn());
    } catch (error) {
      expect(error).toMatch("501");
    }
  },
  DEFAULT_TIMEOUT_INTERVAL
);
