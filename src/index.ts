import express from "express";
import cors from "cors";
import { router } from "./router/router";
import {
  errorHandler,
  generateTokens,
  refreshJWT,
} from "./middleware/middleware";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use(cors());

app.listen(8080, () => {
  console.info({
    level: "info",
    message: "server running in localhost:8080",
  });
});

app.use("/api", router);

app.post("/create-jwt", generateTokens);
app.post("/refresh-jwt", refreshJWT);
