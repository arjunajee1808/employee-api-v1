import express from "express";
import { handler } from "./app";
import cors from "cors";
import { Logger } from "./logger/logger";
import { service } from "./service";
import { ErrorHandler } from "./errorHandler/errorHandler";

const app = express();
app.use(express.json());
app.use(cors());
const log = new Logger();
const errorHandler = new ErrorHandler();
const serviceInstance = new service({ log, errorHandler });
const handlerInstance = new handler({ serviceInstance, log, errorHandler });

app.listen(8080, () => {
  log.LogCustomMessage({
    level: "info",
    message: "server running in localhost:8080",
  });
});

app.get("/get-employee", (req: any, res: any) => {
  log.Entry();
  handlerInstance.getEmployee();
  const response = handlerInstance.toHandlerResponse();
  writeHandler(res, response.status, response);
  log.Exited();
});

const writeHandler = (res: any, code: number, data: any) => {
  res.status(code).send(data);
};
