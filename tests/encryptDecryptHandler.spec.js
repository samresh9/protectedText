const { expect } = require("chai");
const {
  encryptData,
  decryptData,
  hashData,
} = require("../src/utils/encryptDecryptHandler");

describe("Crypto Functions", () => {
  describe("encryptData function", () => {
    test("should encrypt the given data", () => {
      const note = "This is a secret note";
      const secretKey = "MySecretKey";
      const encryptedData = encryptData(note, secretKey);
      expect(encryptedData).to.be.a("string");
      expect(encryptedData).to.not.equal(note);
    });
  });

  describe("decryptData", () => {
    it("should decrypt the encrypted data", () => {
      const encryptedData =
        "U2FsdGVkX1+YK8Ft2otxcHIDgmMvuLDun+0BR5NMzbs4MiK7bLQwgeB9rp8vzDKX";
      const secretKey = "MySecretKey";
      const decryptedData = decryptData(encryptedData, secretKey);
      expect(decryptedData).to.be.a("string");
      expect(decryptedData).to.equal("This is a secret note");
    });
  });

  describe("hashData", () => {
    it("should hash the data", () => {
      const note = "This is a secret note";
      const secretKey = "MySecretKey";
      const hashedData = hashData(note, secretKey);
      expect(hashedData).to.be.a("string");
    });
  });
});
