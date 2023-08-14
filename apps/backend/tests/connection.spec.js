require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("../src/log/logger");
const { connectMongoDb } = require("../src/connection");

jest.mock("mongoose");
// jest.mock("../src/log/logger");

describe("Mongoose Connection", () => {
  let loggerErrorMock;
  let loggerInfoMock;
  beforeEach(() => {
    loggerInfoMock = jest.spyOn(logger, "info").mockImplementation(() => {});
    loggerErrorMock = jest.spyOn(logger, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should connect to the database", async () => {
    // returns a resolved promise when called
    mongoose.connect.mockResolvedValueOnce();
    await connectMongoDb();
    expect(mongoose.connect).toHaveBeenCalledWith(
      process.env.MONGO_CONNECTION_URI
    );
    expect(loggerInfoMock).toHaveBeenCalledWith("Databsase Connected");
  });
  it("Should give the error if database is not connected", async () => {
    const errorMessage = "database error occurred";
    // returns a rejected promise with new error
    mongoose.connect.mockRejectedValueOnce(new Error(errorMessage));
    expect.assertions(1); // Expecting 1 assertions to be called in catch
    try {
      await connectMongoDb();
    } catch (error) {
      expect(loggerErrorMock).toHaveBeenCalledWith(
        "databse error occured",
        error
      );
    }
  });
});
