import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GameSwap API",
      version: "1.0.0",
      description: "API documentation for the GameSwap backend",
    },
    servers: [
      {
        url: "http://localhost:5000", // Change to production URL later
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // file paths with JSDoc annotations
};

export default swaggerJsdoc(options);
