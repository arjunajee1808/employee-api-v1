export class Logger {
  private correlationId: string | undefined;

  constructor() {}

  public setCorrelationId(correlationId: string) {
    this.correlationId = correlationId;
  }

  private log({ level, message, details = "" }: iLogger) {
    let toLog: any = {
      level,
      message,
      flowId: this.correlationId,
      timeStamp: new Date().toISOString(),
    };
    if (details) {
      toLog = {
        ...toLog,
        details,
      };
    }
    switch (level) {
      case LogLevel.INFO:
        console.info(toLog);
        return;
      case LogLevel.DEBUG:
        console.debug(toLog);
        return;
      case LogLevel.ERROR:
        console.error(toLog);
        return;
      default:
        console.log(toLog);
        return;
    }
  }
  public Entry() {
    this.log({ level: LogLevel.INFO, message: "Entered" });
  }

  public LogOperationSuccess() {
    this.log({
      level: LogLevel.INFO,
      message: "Operation Executed Successfully",
    });
  }
  public LogCustomMessage({ level, message, details }: iLogger) {
    this.log({ level, message, details });
  }

  public Exit() {
    this.log({ level: LogLevel.INFO, message: "Exited" });
  }
}

interface iLogger {
  level: string;
  message: string;
  details?: any;
}

export enum LogLevel {
  INFO = "info",
  DEBUG = "debug",
  ERROR = "error",
}
