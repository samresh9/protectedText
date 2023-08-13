const request = require("supertest");

const app = require("../../src/index");
const Note = require("../../src/models/notesModel");

describe("GET /:id", () => {
  let id;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return the data from given id", async () => {
    id = "test1";
    Note.findOne = jest.fn().mockReturnValue({
      id,
      encryptedContent:
        "U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb",
    });
    const response = await request(app).get(`/api/notes/${id}`).expect(200);
    const { encrypted, decrypted } = response.body.data.content;
    expect(response.body.data.id).toBe(id);
    expect(encrypted).toBe(
      "U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb"
    );
    expect(decrypted).toBeNull();
  });

  it("should return 404 error if the given id is not found", async () => {
    id = "test9999";
    Note.findOne = jest.fn().mockReturnValue(null);
    const response = await request(app).get(`/api/notes/${id}`).expect(404);
    expect(response.body.message).toBe("Not Found GET /api/notes/test9999");
    expect(response.body.code).toBe("NOT_FOUND");
  });

  it("should return 500 error if internal server error occurs", async () => {
    Note.findOne = jest
      .fn()
      .mockRejectedValue(new Error("Internal server Error"));
    const response = await request(app).get(`/api/notes/${id}`).expect(500);
    expect(response.body).toHaveProperty("message");
  });
});

describe("POST / ", () => {
  let noteData;
  beforeEach(() => {
    noteData = {
      id: "test999",
      encryptedContent:
        "U2FsdGVkX19h3AjJNnXeDJlr2PJ81Z8eeIXU10qFlDxBK77ePuJtXKMY5LT1FWMt",
      hash: "43db4d6819813366729707ab93a2533ce0b6d405c66b76995472d36798f6bb53ff45f87d6efb5a5c822af7112d858d3f5fc0bde5e98ca4206391403060e3e3b7",
    };
  });

  const existingSite = {
    id: "test999",
    encryptedContent:
      "U2FsdGVkX19h3AjJNnXeDJlr2PJ81Z8eeIXU10qFlDxBK77ePuJtXKMY5LT1FWMt",
    hash: "43db4d6819813366729707ab93a2533ce0b6d405c66b76995472d36798f6bb53ff45f87d6efb5a5c822af7112d858d3f5fc0bde5e98ca4206391403060e3e3b7",
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create a new note", async () => {
    Note.findOne = jest.fn().mockReturnValue(null);
    Note.create = jest.fn().mockResolvedValue(noteData);
    const response = await request(app)
      .post("/api/notes")
      .send(noteData)
      .expect(200);
    expect(Note.create).toHaveBeenCalledWith(noteData);
    const expectedResponse = {
      new: true,
      updated: false,
      data: {
        id: "test999",
        content: {
          encrypted:
            "U2FsdGVkX19h3AjJNnXeDJlr2PJ81Z8eeIXU10qFlDxBK77ePuJtXKMY5LT1FWMt",
          decrypted: null,
        },
      },
    };
    expect(expectedResponse).toEqual(response.body);
  });

  it("should update an existing note", async () => {
    const updatedData = {
      id: "test999",
      encryptedContent: "U2FsdGVkX1+ROT30Q+O2KPErrOjNBAb5RdUw7mC5ITw=",
      hash: "4e4e859d38b5f253532f9d6565cfb50753714ae022adab5e859b068910a2ed4aaa5a1aa0d7967b44af7a2f5f1d144afd539bbd3f2594bf5d067167af78acbe68",
    };

    Note.findOne = jest.fn().mockResolvedValue(existingSite);
    existingSite.save = jest.fn().mockResolvedValue(updatedData);

    const response = await request(app)
      .post("/api/notes")
      .send(updatedData)
      .expect(200);

    const expectedResponse = {
      new: false,
      updated: true,
      data: {
        id: "test999",
        content: {
          encrypted: "U2FsdGVkX1+ROT30Q+O2KPErrOjNBAb5RdUw7mC5ITw=",
          decrypted: null,
        },
      },
    };

    expect(response.body).toEqual(expectedResponse);
  });
  it("should return an existing note without updating if hash matches", async () => {
    Note.findOne = jest.fn().mockReturnValue(existingSite);
    const response = await request(app)
      .post("/api/notes")
      .send(existingSite)
      .expect(200);

    const expectedResponse = {
      new: false,
      updated: false,
      data: {
        id: "test999",
        content: {
          encrypted: existingSite.encryptedContent,
          decrypted: null,
        },
      },
    };
    expect(expectedResponse).toEqual(response.body);
  });

  it("should give validation error if hash is missing", async () => {
    noteData = {
      id: "test999",
      encryptedContent:
        "U2FsdGVkX19h3AjJNnXeDJlr2PJ81Z8eeIXU10qFlDxBK77ePuJtXKMY5LT1FWMt",
    };
    const response = await request(app)
      .post("/api/notes")
      .send(noteData)
      .expect(400);
    const { message, code } = response.body;
    expect(message).toBe("Hash Content is required");
    expect(code).toBe("VALIDATION_ERROR");
  });

  it("should return 500 error if internal server error occurs", async () => {
    Note.findOne = jest
      .fn()
      .mockRejectedValue(new Error("Internal server Error"));
    const response = await request(app)
      .post("/api/notes")
      .send(noteData)
      .expect(500);
    expect(response.body).toHaveProperty("message");
  });
});
