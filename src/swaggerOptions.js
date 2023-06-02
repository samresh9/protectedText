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
        url: "http://localhost:7000",
        description: "Development",
      },
      {
        url: process.env.SERVER_URL,
        description: "Production",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = options;
