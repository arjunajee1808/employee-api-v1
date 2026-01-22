import express from "express";
import { handler } from "../handler/handler";
import { LogLevel } from "../logger/logger";
import { service } from "../service/service";
import { getFlowId, writeHandler } from "../utils/utils";
import { Cache } from "../cache";
import { authorizeJWT, MethodHandler } from "../middleware/middleware";

export const router = () => {
  const routerInstance = express.Router();
  routerInstance.use(authorizeJWT);
  routerInstance.use(MethodHandler);

  routerInstance.get(
    "/employees",
    async (_req: express.Request, res: express.Response) => {
      const cacheInstance = Cache.getInstance();
      const { log, errorHandler } = cacheInstance.getCache();
      log.setCorrelationId(getFlowId());
      const serviceInstance = new service();
      const handlerInstance = new handler({
        serviceInstance,
        log,
        errorHandler,
      });
      log.Entry();
      await handlerInstance.getEmployees();
      const response = handlerInstance.toHandlerResponse();
      writeHandler(res, response.status, response);
      log.Exit();
    }
  );

  routerInstance.get(
    "/employee/:id",
    async (req: express.Request, res: express.Response) => {
      const cacheInstance = Cache.getInstance();
      const { log, errorHandler } = cacheInstance.getCache();
      log.setCorrelationId(getFlowId());
      const serviceInstance = new service();
      const handlerInstance = new handler({
        serviceInstance,
        log,
        errorHandler,
      });
      log.Entry();
      const id = req.params?.["id"] || "";
      log.LogCustomMessage({
        level: LogLevel.INFO,
        message: "request-id",
        details: id,
      });
      await handlerInstance.getEmployee(id);
      const response = handlerInstance.toHandlerResponse();
      writeHandler(res, response.status, response);
      log.Exit();
    }
  );

  routerInstance.post(
    "/add-employee",
    async (req: express.Request, res: express.Response) => {
      const cacheInstance = Cache.getInstance();
      const { log, errorHandler } = cacheInstance.getCache();
      log.setCorrelationId(getFlowId());
      const serviceInstance = new service();
      const handlerInstance = new handler({
        serviceInstance,
        log,
        errorHandler,
      });
      log.Entry();
      const employee = req.body || {};
      log.LogCustomMessage({
        level: LogLevel.INFO,
        message: "request-body",
        details: employee,
      });
      await handlerInstance.addEmployee(employee);
      const response = handlerInstance.toHandlerResponse();
      writeHandler(res, response.status, response);
      log.Exit();
    }
  );

  routerInstance.put(
    "/employee/:id",
    async (req: express.Request, res: express.Response) => {
      const cacheInstance = Cache.getInstance();
      const { log, errorHandler } = cacheInstance.getCache();
      log.setCorrelationId(getFlowId());
      const serviceInstance = new service();
      const handlerInstance = new handler({
        serviceInstance,
        log,
        errorHandler,
      });
      log.Entry();
      const id = parseInt(req.params?.["id"] || "0");
      const employee = req.body || {};
      log.LogCustomMessage({
        level: LogLevel.INFO,
        message: "update-employee",
        details: { id, employee },
      });
      await handlerInstance.updateEmployee(id, employee);
      const response = handlerInstance.toHandlerResponse();
      writeHandler(res, response.status, response);
      log.Exit();
    }
  );

  routerInstance.delete(
    "/employee/:id",
    async (req: express.Request, res: express.Response) => {
      const cacheInstance = Cache.getInstance();
      const { log, errorHandler } = cacheInstance.getCache();
      log.setCorrelationId(getFlowId());
      const serviceInstance = new service();
      const handlerInstance = new handler({
        serviceInstance,
        log,
        errorHandler,
      });
      log.Entry();
      const id = parseInt(req.params?.["id"] || "0");
      log.LogCustomMessage({
        level: LogLevel.INFO,
        message: "delete-employee",
        details: id,
      });
      await handlerInstance.deleteEmployee(id);
      const response = handlerInstance.toHandlerResponse();
      writeHandler(res, response.status, response);
      log.Exit();
    }
  );

  return routerInstance;
};
