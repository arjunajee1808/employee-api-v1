import express from "express";
import { randomUUID } from "crypto";

export const writeHandler = (
  res: express.Response,
  code: number,
  data: any
) => {
  res.status(code).send(data);
};

export const getFlowId = (): string => {
  return randomUUID();
};

export enum RequestMethods {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE",
  Options = "OPTIONS",
}

export const ApiAllowedMethods: Record<string, string[]> = {
  "/employees": [RequestMethods.Get],
  "/employee/:id": [RequestMethods.Get, RequestMethods.Put, RequestMethods.Delete],
  "/add-employee": [RequestMethods.Post],
};
