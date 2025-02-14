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
