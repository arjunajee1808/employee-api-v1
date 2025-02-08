import express from "express";

export const writeHandler = (
  res: express.Response,
  code: number,
  data: any
) => {
  res.status(code).send(data);
};

export const getFlowId = (): string => {
  return Math.random().toPrecision(12).toString().split(".")[1];
};
