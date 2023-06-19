const { validationResult } = require("express-validator");
const {
  noteSchema,
  encryptSchema,
  decryptSchema,
} = require("../../src/validations/notesRoutesValidations");

describe("noteSchema validation", () => {
  let errors;

  it(" should validate 'id', 'encryptedContent', and 'hash' in noteSchema", async () => {
    const req = {
      body: { id: "test", encryptedContent: "encrypted", hash: "abc123" },
    };
    const validations = await Promise.all(
      noteSchema.map((validation) => validation.run(req))
    );
    expect(validations).toHaveLength(3);
    errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });

  it(" should throw an error if 'id' is missing in the request body", async () => {
    const req = {
      body: { encryptedContent: "encrypted", hash: "abc123" },
    };
    await Promise.all(noteSchema.map((validation) => validation.run(req)));
    errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()).toContainEqual({
      type: "field",
      value: undefined,
      msg: "Note unique id is required",
      path: "id",
      location: "body",
    });
  });
});
describe("encrypt validation", () => {
  let errors;

  it(" should validate  'content', and 'secretKey' in encryptSchema", async () => {
    const req = {
      body: { content: "encrypted", secretKey: "abc123" },
    };
    const validations = await Promise.all(
      encryptSchema.map((validation) => validation.run(req))
    );

    expect(validations).toHaveLength(2);
    errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });

  it(" should throw an error if 'content' is missing in the request body", async () => {
    const req = {
      body: { secretKey: "abc123" },
    };
    await Promise.all(encryptSchema.map((validation) => validation.run(req)));
    errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()).toContainEqual({
      type: "field",
      value: undefined,
      msg: "Note is required",
      path: "content",
      location: "body",
    });
  });
});
describe("decryptSchema validation", () => {
  let errors;

  it(" should validate 'encryptedContent', and 'secretKey' in decryptSchema", async () => {
    const req = {
      body: { encryptedContent: "encrypted", secretKey: "abc123" },
    };
    const validations = await Promise.all(
      decryptSchema.map((validation) => validation.run(req))
    );

    expect(validations).toHaveLength(2);
    errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });

  it(" should throw an error if 'encryptedContent' is missing in the request body", async () => {
    const req = {
      body: { secretKey: "abc123" },
    };
    await Promise.all(decryptSchema.map((validation) => validation.run(req)));
    errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()).toContainEqual({
      type: "field",
      value: undefined,
      msg: "Encrypted Data id required",
      path: "encryptedContent",
      location: "body",
    });
  });
});
