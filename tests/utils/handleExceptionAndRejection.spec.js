const logger = require("../../src/log/logger");
const {
  unhandledRejectionsHandler,
  uncaughtExceptionHandler,
} = require("../../src/utils/handleExceptionAndRejections");

describe("uncaught exception and rejection handling", () => {
  let loggerErrorMock;
  beforeEach(() => {
    process.exit = jest.fn();
    loggerErrorMock = jest.spyOn(logger, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should log error and exit when handling unhandled rejections", () => {
    const errorMessage = "unhandled rejection error";
    unhandledRejectionsHandler(new Error(errorMessage));
    expect(loggerErrorMock).toHaveBeenCalledWith(errorMessage);
    expect(process.exit).toHaveBeenCalledTimes(1);
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it("should log error and exit when handling uncaught exceptions", () => {
    const errorMessage = "uncaught exception error";
    uncaughtExceptionHandler(new Error(errorMessage));
    expect(loggerErrorMock).toHaveBeenCalledWith(
      "Uncaught exception shutting down",
      { message: errorMessage }
    );
    expect(process.exit).toHaveBeenCalledTimes(1);
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
