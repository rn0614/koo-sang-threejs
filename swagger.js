const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API 명세서",
      version: "1.0.0",
    },
  },
  apis: [
    "./app/api/**/*.js",
    "./app/api/**/*.ts",
    path.resolve(__dirname, "./types-schema.json"),
  ], // API Route 경로
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
