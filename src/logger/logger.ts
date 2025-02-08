export class Logger {
  private correlationId: string;

  constructor(correalationId: string) {
    this.correlationId = correalationId;
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
      case "info":
        console.info(toLog);
        return;
      case "debug":
        console.debug(toLog);
        return;
      case "error":
        console.error(toLog);
        return;
      default:
        console.log(toLog);
        return;
    }
  }
  public Entry() {
    this.log({ level: "info", message: "Entered" });
  }

  public LogOperationSuccess() {
    this.log({
      level: "info",
      message: "Operation Executed Successfully",
    });
  }
  public LogCustomMessage({ level, message, details }: iLogger) {
    this.log({ level, message, details });
  }

  public Exit() {
    this.log({ level: "info", message: "Exited" });
  }
}

interface iLogger {
  level: string;
  message: string;
  details?: any;
}
