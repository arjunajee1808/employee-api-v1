export class Logger {
  private log({ level, message }: iLogger) {
    switch (level) {
      case "info":
        console.info({ level, message, timeStamp: new Date().toISOString() });
        return;
      case "debug":
        console.debug({ level, message, timeStamp: new Date().toISOString() });
        return;
      case "error":
        console.error({ level, message, timeStamp: new Date().toISOString() });
        return;
      default:
        console.log({ level, message, timeStamp: new Date().toISOString() });
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
  public LogCustomMessage({ level, message }: iLogger) {
    this.log({ level, message });
  }

  public Exited() {
    this.log({ level: "info", message: "Exited" });
  }
}

interface iLogger {
  level: string;
  message: string;
}
