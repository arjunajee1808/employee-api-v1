import { ErrorHandler } from "../errorHandler/errorHandler";
import { Logger } from "../logger/logger";
import { iService } from "./iService";

export interface iHandler {
  log: Logger;
  serviceInstance: iService;
  errorHandler: ErrorHandler;
}

export interface iHandlerResponse {
  status: number;
  details?: any;
}
