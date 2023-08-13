const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Protected Text Api Documentation",
      version: "1.0.0",
      description:
        "This is a Protected Text API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: process.env.SERVER_URL || "http://localhost:7000",
        description: "Development",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = options;
