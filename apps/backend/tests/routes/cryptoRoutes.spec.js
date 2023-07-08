const request = require("supertest");

const app = require("../../src/index");

describe("POST /crypto/encrypt", () => {
  it("should encrypt the data and return the result", async () => {
    const inputData = {
      content: "this is test",
      secretKey: "mySecretKey",
    };
    const response = await request(app)
      .post("/crypto/encrypt")
      .send(inputData)
      .expect(200);
    const { encrypted, hash, decrypted } = response.body.data.content;
    expect(encrypted).toBeDefined();
    expect(hash).toBe(
      "a9932879779a505320549ca1f0c321ca45262956c07cd57f4de5c8faecc87deca68afbb826f35e9a44d47da0820d74b86a81804365219edd2e8aaac166654644"
    );
    expect(decrypted).toBeNull();
  });

  it("should return validation error if the content is missing", async () => {
    const inputData = {
      secretKey: "mySecretkey",
    };
    const response = await request(app)
      .post("/crypto/encrypt")
      .send(inputData)
      .set("Accept", "application/json")
      .expect(400);
    const { message, code } = response.body;
    expect(message).toBe("Note is required");
    expect(code).toBe("VALIDATION_ERROR");
  });
});
describe("POST crypto/decrypt", () => {
  it("should decrypt the data and return the result", async () => {
    const inputData = {
      encryptedContent: "U2FsdGVkX18kxccFhTnD5vhWcoXgGxEyfh+suuqlLic=",
      secretKey: "mySecretKey",
    };
    const response = await request(app)
      .post("/crypto/decrypt")
      .send(inputData)
      .expect(200);
    const { encrypted, hash, decrypted } = response.body.data.content;
    expect(encrypted).toBeNull();
    expect(hash).toBeNull();
    expect(decrypted).toBe("this is test");
  });

  it("should give validation error if encryptedData is missing", async () => {
    const inputData = {
      secretKey: "mySecretKey",
    };
    const response = await request(app)
      .post("/crypto/decrypt")
      .send(inputData)
      .expect(400);
    const { message, code } = response.body;
    expect(message).toBe("Encrypted Data is required");
    expect(code).toBe("VALIDATION_ERROR");
  });
});
