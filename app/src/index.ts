import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";
import { config } from "dotenv";

// Read .env file configuration if environment is not production
if (process.env.NODE_ENV !== "production") {
  config();
}

import audit = require("express-requests-logger");
import bunyan = require("bunyan");

createConnection()
  .then(async () => {
    const app = express();

    // Needed for request logging purposes
    const logger = bunyan.createLogger({
      name: "main",
      streams: [
        {
          path: process.env.LOG_FILE_LOCATION
        }
      ]
    });

    // Use logging for all requests
    app.use(
      audit({
        logger: logger,
        request: {
          maskBody: ["password"],
          excludeHeaders: ["authorization"],
          maxBodyLength: 50
        },
        response: {
          maskBody: ["session_token"],
          excludeHeaders: ["*"],
          excludeBody: ["*"],
          maskHeaders: ["header1"],
          maxBodyLength: 50
        }
      })
    );

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.use("/", routes);

    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch(error => console.log(error));
