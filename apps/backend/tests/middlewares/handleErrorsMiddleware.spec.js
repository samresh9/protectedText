const request = require("supertest");
const express = require("express");
const config = require("config");
const {
  handleNotFound,
  handle500Error,
} = require("../../src/middlewares/handleErrorsMiddleware");

const app = express();

// Register error handling middleware
app.use(handleNotFound);
app.use(handle500Error);
describe("handleNotFound", () => {
  it("should create a custom 404 error and pass it to the next middleware", async () => {
    const response = await request(app)
      .get("/api/notes/some-endpoint")
      .expect(404);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: `Not Found GET /api/notes/some-endpoint`,
      code: config.get("errorsCodes").notFound,
    });
  });
});

describe("handle500Error", () => {
  it("should return 500 Internal Server Error", () => {
    const mockError = new Error("Something went wrong");
    mockError.code = "SOME_ERROR_CODE";

    const mockRequest = {};
    const mockResponse = {
      statusCode: 500,
      send: jest.fn(),
    };
    handle500Error(mockError, mockRequest, mockResponse, jest.fn());
    expect(mockResponse.statusCode).toBe(500);
    expect(mockResponse.send).toHaveBeenCalledWith({
      message: "Something went wrong",
      code: "SOME_ERROR_CODE",
    });
  });
});
