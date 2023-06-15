const {
  encryptData,
  decryptData,
  hashData,
} = require("../../src/utils/encryptDecryptHandler");

describe("encryptData function", () => {
  let note;
  let secretKey;
  beforeEach(() => {
    note = "This is a secret note";
    secretKey = "MySecretKey";
  });
  it("should encrypt the data if note and secret key is passed", () => {
    const encryptedData = encryptData(note, secretKey);
    expect(typeof encryptedData).toBe("string");
    expect(encryptedData).not.toBe(note);
    expect(decryptData(encryptedData, secretKey)).toBe(note);
  });
  it("should throw error if secret key is null", () => {
    secretKey = null;
    expect(() => {
      encryptData(note, secretKey);
    }).toThrow();
  });
});

describe("decryptData", () => {
  it("should decrypt the encrypted data", () => {
    const secretKey = "MySecretKey";
    const note = "This is a secret note";
    const encryptedData = encryptData(note, secretKey);
    const decryptedData = decryptData(encryptedData, secretKey);
    expect(typeof decryptedData).toBe("string");
    expect(decryptedData).toBe(note);
  });
});

describe("hashData", () => {
  it("should hash the data", () => {
    const note = "This is a secret note";
    const secretKey = "MySecretKey";
    const hashedData = hashData(note, secretKey);
    expect(typeof hashedData).toBe("string");
  });
});
