import UserModel from "./UserModel.js";
import * as userMocks from "./mocks/user.mock.js";
import { configurationFile } from "../lib/config";
import mongoose from "mongoose";
let userModel,
  firebaseModel,
  DEFAULT_TIMEOUT_INTERVAL = 100000,
  connection = null,
  password = "123456";

beforeEach(async () => {
  connection = await mongoose.createConnection(
    configurationFile[process.env["NODE_ENV"]].mongoUrl,
    async err => {
      if (err) {
        throw err;
      }
    }
  );
  userModel = new UserModel();
});

test(
  "UserModel - create -success",
  async () => {
    const createdUser = await userModel.create(userMocks.fullUserMock);
    expect(createdUser.firstName).toBe(userMocks.fullUserMock.firstName);
    expect(createdUser.lastName).toBe(userMocks.fullUserMock.lastName);
    const foundUser = await userModel.model.findById(createdUser._id);
    expect(foundUser.botChannelId).toBe(userMocks.fullUserMock.botChannelId);
    expect(foundUser.firebaseId).toBe(userMocks.fullUserMock.firebaseId);
    expect(foundUser.email).toBe(userMocks.fullUserMock.email);
    expect(foundUser.firstName).toBe(userMocks.fullUserMock.firstName);
    expect(foundUser.lastName).toBe(userMocks.fullUserMock.lastName);
    expect(foundUser.phoneNumber).toBe(userMocks.fullUserMock.phoneNumber);
  },
  DEFAULT_TIMEOUT_INTERVAL
);

test(
  "failure",
  async () => {
    try {
      const createdUser = await userModel.create(
        userMocks.userMockWithNotEnoughParams
      );
    } catch (error) {
      await expect(error).toBeTruthy();
    }
  },
  10000
);

test.only(
  "UserModel - login -success",
  async () => {
    const createdUser = await userModel.create(userMocks.fullUserMock);
    const foundUser = await userModel.get(userMocks.fullUserMock);
    expect(foundUser.botChannelId).toBe(userMocks.fullUserMock.botChannelId);
    expect(foundUser.firebaseId).toBe(userMocks.fullUserMock.firebaseId);
    expect(foundUser.email).toBe(userMocks.fullUserMock.email);
    expect(foundUser.firstName).toBe(userMocks.fullUserMock.firstName);
    expect(foundUser.lastName).toBe(userMocks.fullUserMock.lastName);
    expect(foundUser.phoneNumber).toBe(userMocks.fullUserMock.phoneNumber);
    expect(foundUser.password).toBe(userMocks.fullUserMock.password);
  },
  DEFAULT_TIMEOUT_INTERVAL
);
test(
  "failure-login",
  async () => {
    try {
      const createdUser = await userModel.get(
        userMocks.userMockWithNotEnoughParams
      );
    } catch (error) {
      await expect(error).toBeTruthy();
    }
  },
  DEFAULT_TIMEOUT_INTERVAL
);

afterEach(async () => {
  connection.dropDatabase();
});
