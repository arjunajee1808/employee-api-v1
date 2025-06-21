import express from "express";
import { v4 } from "uuid";

export const writeHandler = (
  res: express.Response,
  code: number,
  data: any
) => {
  res.status(code).send(data);
};

export const getFlowId = (): string => {
  return v4();
};

export enum RequestMethods {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Options = "OPTIONS",
}

export const ApiAllowedMethods: Record<string, string[]> = {
  "/employees": [RequestMethods.Get],
  "/employee/:id": [RequestMethods.Get],
};
