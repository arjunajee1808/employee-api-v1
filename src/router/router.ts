import express from "express";
import { handler } from "../handler/handler";
import { LogLevel } from "../logger/logger";
import { service } from "../service/service";
import { getFlowId, writeHandler } from "../utils/utils";
import { Cache } from "../cache";
import { authorizeJWT, MethodHandler } from "../middleware/middleware";

export const router = express.Router();
router.use(authorizeJWT);
router.use(MethodHandler);

router.get("/employees", (_req: express.Request, res: express.Response) => {
  const cacheInstance = Cache.getInstance();
  const { log, errorHandler } = cacheInstance.getCache();
  log.setCorrelationId(getFlowId());
  const serviceInstance = new service({ log, errorHandler });
  const handlerInstance = new handler({ serviceInstance, log, errorHandler });
  log.Entry();
  handlerInstance.getEmployees();
  const response = handlerInstance.toHandlerResponse();
  writeHandler(res, response.status, response);
  log.Exit();
});

router.get("/employee/:id", (req: express.Request, res: express.Response) => {
  const cacheInstance = Cache.getInstance();
  const { log, errorHandler } = cacheInstance.getCache();
  log.setCorrelationId(getFlowId());
  const serviceInstance = new service({ log, errorHandler });
  const handlerInstance = new handler({ serviceInstance, log, errorHandler });
  log.Entry();
  const id = req.params?.["id"] || "";
  log.LogCustomMessage({
    level: LogLevel.INFO,
    message: "request-id",
    details: id,
  });
  handlerInstance.getEmployee(id);
  const response = handlerInstance.toHandlerResponse();
  writeHandler(res, response.status, response);
  log.Exit();
});

router.post("/add-employee", (req: express.Request, res: express.Response) => {
  const cacheInstance = Cache.getInstance();
  const { log, errorHandler } = cacheInstance.getCache();
  log.setCorrelationId(getFlowId());
  const serviceInstance = new service({ log, errorHandler });
  const handlerInstance = new handler({ serviceInstance, log, errorHandler });
  log.Entry();
  const employee = req.body || {};
  log.LogCustomMessage({
    level: LogLevel.INFO,
    message: "request-id",
    details: employee,
  });
  handlerInstance.addEmployee(employee);
  const response = handlerInstance.toHandlerResponse();
  writeHandler(res, response.status, response);
  log.Exit();
});
