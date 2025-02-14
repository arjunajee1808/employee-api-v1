import express from "express";
import cors from "cors";
import { router } from "./router/router";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(8080, () => {
  console.info({
    level: "info",
    message: "server running in localhost:8080",
  });
});

app.use("/api", router);
