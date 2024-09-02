/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from "express";
import exitHook from "async-exit-hook";
import { CLOSE_DB, CONNECT_DB, GET_DB } from "./config/mongodb";
import { env } from "./config/environment";

const START_SERVER = () => {
  const app = express();

  const hostname = "localhost";
  const port = 8017;

  app.get("/", async (req, res) => {
    console.log(await GET_DB().listCollections().toArray());

    // Test Absolute import mapOrder
    res.end("<h1>Hello World!</h1><hr>");
  });

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Hello ${env.AUTHOR}, I am running at http://${hostname}:${port}/`
    );
  });

  exitHook(() => {
    console.log(`Exiting app`);
    CLOSE_DB();
  });
};

CONNECT_DB()
  .then(() => console.log("Connect to MongoDB Cloud Atlas!"))
  .then(() => START_SERVER())
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
