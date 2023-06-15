const { expect } = require("chai");
const { capitalizeString } = require("../src/utils/testHelper");

describe("Capitalise the string", () => {
  test("should capitalise the first letter of the string", () => {
    const res = capitalizeString("test");
    expect(res).to.equal("Test");
  });
  test("should return empty if the input string is empty", () => {
    const res = capitalizeString(" ");
    expect(res).to.equal(" ");
  });
  test("should return same if the input string is already starts with capital", () => {
    const res = capitalizeString("Test");
    expect(res).to.equal("Test");
  });
});
