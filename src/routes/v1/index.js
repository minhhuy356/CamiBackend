import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRoute } from "./boardRoutes";

const Router = express.Router();

Router.get("/status", (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ message: "API v1 are ready to use", code: StatusCodes.OK });
});

Router.use("/boards", boardRoute);

export const APIs_V1 = Router;
