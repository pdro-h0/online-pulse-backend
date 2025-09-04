import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { env } from "../env";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Pulse",
      version: "1.0.0",
      description:
        "API para gerenciar convites de links.",
    },
    servers: [
      {
        url: "http://online-pulse-backend.onrender.com",
      },
      {
        url: `http://localhost:${env.PORT}`,
      },
    ],
  },
  apis: ["./src/swagger.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}