import express from "express";
import cors from "cors";
import { router } from "./router/router";
import {
  errorHandler,
  generateTokens,
  refreshJWT,
} from "./middleware/middleware";
import * as dotenv from "dotenv";
import { Cache } from "./cache";
import swaggerUi from "swagger-ui-express";
import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";
dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use(cors());

// Initialize database connection
const initializeApp = async () => {
  try {
    const cache = Cache.getInstance();
    await cache.initializeDatabase();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

initializeApp().then(() => {
  // Serve API documentation
  const swaggerDocument = yaml.load(
    fs.readFileSync(path.join(__dirname, "swagger/openapi.yaml"), "utf8")
  ) as any;
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get("/api-docs/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerDocument);
  });

  app.use("/api", router());

  app.listen(8080, () => {
    console.log({
      level: "info",
      message: "server running in localhost:8080",
    });
  });
});

app.post("/create-jwt", generateTokens);
app.post("/refresh-jwt", refreshJWT);
