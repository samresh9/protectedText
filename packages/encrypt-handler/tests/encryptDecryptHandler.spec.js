const CryptoJS = require("crypto-js");
const {
  encryptData,
  decryptData,
  hashData,
} = require("../src/encryptDecryptHandler");

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
    const encryptedData = encryptData(note, secretKey);
    const decryptedValue = CryptoJS.AES.decrypt(
      encryptedData,
      secretKey
    ).toString(CryptoJS.enc.Utf8);
    expect(decryptedValue).toBe(note);
    expect(encryptSpy).toHaveBeenCalledTimes(1);
    expect(encryptSpy).toHaveBeenCalledWith(note, secretKey);
  });

  it("should encrypt the data if note and secret key is passed", () => {
    const encryptedData = encryptData(note, secretKey);
    expect(typeof encryptedData).toBe("string");
    expect(encryptedData).toBeTruthy();
  });

  it("should throw a TypeError if the secret key is null", () => {
    expect(() => {
      encryptData(note, null);
    }).toThrow("Cannot read properties of null (reading 'words')");
  });
});

describe("decryptData", () => {
  let note;
  let secretKey;
  let decryptSpy;
  let encryptedData;

  beforeEach(() => {
    note = "This is a secret note";
    secretKey = "MySecretKey";
    decryptSpy = jest.spyOn(CryptoJS.AES, "decrypt");
  });

  afterEach(() => {
    decryptSpy.mockRestore();
  });

  it("should call CryptoJS.AES.decrypt with expected params", () => {
    encryptedData = encryptData(note, secretKey);
    const decryptedValue = CryptoJS.AES.decrypt(
      encryptedData,
      secretKey
    ).toString(CryptoJS.enc.Utf8);
    expect(decryptedValue).toBe(note);
    expect(decryptSpy).toHaveBeenCalledTimes(1);
    expect(decryptSpy).toHaveBeenCalledWith(encryptedData, secretKey);
  });

  it("should decrypt the encrypted data", () => {
    const decryptedData = decryptData(encryptedData, secretKey);
    expect(decryptedData).toBe(note);
  });

  it("should throw a TypeError if the secret key is null", () => {
    expect(() => {
      decryptData(note, null);
    }).toThrow("Cannot read properties of null (reading 'words')");
  });
});

describe("hashData", () => {
  let note;
  let secretKey;
  let expectedHash;
  let hashSpy;

  beforeEach(() => {
    note = "This is a secret note";
    secretKey = "MySecretKey";
    expectedHash =
      "af44ad1508d5592d9ce9a2524c184f594399f522a7e655a7c1b4ea5b76292cc094cdb8e411d968a02466a0775f415df094838275f0410cd7ca13f79b458e3787";
    hashSpy = jest.spyOn(CryptoJS, "SHA512");
  });

  afterEach(() => {
    hashSpy.mockRestore();
  });

  it("should call CryptoJS.SHA512 with expected params and hash the content", () => {
    const hash = hashData(note, secretKey);
    expect(hashSpy).toHaveBeenCalledTimes(1);
    expect(hashSpy).toHaveBeenCalledWith(note, secretKey);
    expect(hash).toBe(expectedHash);
  });
});
