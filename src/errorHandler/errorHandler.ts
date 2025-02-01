export class ErrorHandler extends Error {
  public BadRequest(details?: Error): iError {
    return {
      statusCode: httpcode.STS_BAD_REQUEST,
      message: "Bad Request, Please Enter Correct Values",
      details: details?.message || details || undefined,
    };
  }
  public InterServerError(details?: Error): iError {
    return {
      statusCode: httpcode.STS_INT_SRV_ERR,
      message: "Encountered Internal Server Error",
      details: details?.message || details || undefined,
    };
  }
}

export interface iError {
  statusCode: number;
  message: string;
  details?: any;
}

export enum httpcode {
  STS_BAD_REQUEST = 400,
  STS_OK = 200,
  STS_INT_SRV_ERR = 500,
  STS_CREATED = 201,
}
