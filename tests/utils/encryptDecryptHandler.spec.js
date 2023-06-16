const CryptoJS = require("crypto-js");
const {
  encryptData,
  decryptData,
  hashData,
} = require("../../src/utils/encryptDecryptHandler");

describe("encryptData function", () => {
  let note;
  let secretKey;
  let encryptSpy;

  beforeEach(() => {
    note = "This is a secret note";
    secretKey = "MySecretKey";
    encryptSpy = jest.spyOn(CryptoJS.AES, "encrypt");
  });

  afterEach(() => {
    encryptSpy.mockRestore();
  });

  it("should call CryptoJS.AES.encrypt with expected params", () => {
    encryptData(note, secretKey);
    expect(encryptSpy).toHaveBeenCalledTimes(1);
    expect(encryptSpy).toHaveBeenCalledWith(note, secretKey);
  });

  it("should encrypt the data if note and secret key is passed", () => {
    const encryptedData = encryptData(note, secretKey);
    expect(typeof encryptedData).toBe("string");
    expect(encryptedData).toBeTruthy();
  });

  it("should throw a TypeError if the secret key is null", () => {
    secretKey = null;
    expect(() => {
      encryptData(note, secretKey);
    }).toThrow("Cannot read properties of null (reading 'words')");
  });
});

describe("decryptData", () => {
  let note;
  let secretKey;
  let encryptedData;
  let decryptSpy;

  beforeEach(() => {
    note = "This is a secret note";
    secretKey = "MySecretKey";
    encryptedData =
      "U2FsdGVkX19QuhHk+ZJC3ZnKVtGkwJhNRBLHZ+2YMy9B5sbWhM1lZ+d4+H0xbj1q";
    decryptSpy = jest.spyOn(CryptoJS.AES, "decrypt");
  });

  afterEach(() => {
    decryptSpy.mockRestore();
  });

  it("should call CryptoJS.AES.decrypt with expected params", () => {
    decryptData(encryptedData, secretKey);
    expect(decryptSpy).toHaveBeenCalledTimes(1);
    expect(decryptSpy).toHaveBeenCalledWith(encryptedData, secretKey);
  });

  it("should decrypt the encrypted data", () => {
    const decryptedData = decryptData(encryptedData, secretKey);
    expect(typeof decryptedData).toBe("string");
    expect(decryptedData).toBe(note);
  });

  it("should throw a TypeError if the secret key is null", () => {
    secretKey = null;
    expect(() => {
      decryptData(note, secretKey);
    }).toThrow("Cannot read properties of null (reading 'words')");
  });
});

describe("hashData", () => {
  it("should hash the data", () => {
    const note = "This is a secret note";
    const secretKey = "MySecretKey";
    const expectedHash =
      "af44ad1508d5592d9ce9a2524c184f594399f522a7e655a7c1b4ea5b76292cc094cdb8e411d968a02466a0775f415df094838275f0410cd7ca13f79b458e3787";
    const hashedData = hashData(note, secretKey);
    expect(hashedData).toBe(expectedHash);
  });
});