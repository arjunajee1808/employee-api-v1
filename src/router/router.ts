import express from "express";
import { handler } from "../handler/handler";
import { LogLevel } from "../logger/logger";
import { service } from "../service/service";
import { httpcode } from "../errorHandler/errorHandler";
import { writeHandler } from "../utils/utils";
import { Cache } from "../cache";

export const router = express.Router();

router.get("/employees", (_req: express.Request, res: express.Response) => {
  const { log, errorHandler } = new Cache().getCache();
  const serviceInstance = new service({ log, errorHandler });
  const handlerInstance = new handler({ serviceInstance, log, errorHandler });
  log.Entry();
  handlerInstance.getEmployee();
  const response = handlerInstance.toHandlerResponse();
  writeHandler(res, response.status, response);
  log.Exit();
});

router.put("/employee/:id", (req: express.Request, res: express.Response) => {
  const { log } = new Cache().getCache();
  log.Entry();
  log.LogCustomMessage({
    level: LogLevel.INFO,
    message: "request-id",
    details: req.params["id"],
  });
  writeHandler(res, httpcode.STS_NOCONTENT, req.params["employee-id"]);
  log.Exit();
});
