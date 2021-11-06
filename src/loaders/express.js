const express = require("express");
const morgan = require("morgan");
import compression from "compression";

import routes from "../routes";

/**
 * Application loader
 */
class ExpressLoader {
  /**
   * constructor
   */

  app = express();
  constructor() {
    // Setup error handling, this must be after all other middleware
    this.app.use(ExpressLoader.errorHandler);

    // Set up middleware
    this.app.use(morgan("dev"));
    this.app.use(compression());
    this.app.use(
      express.urlencoded({
        extended: false,
        limit: "20mb",
      })
    );
    this.app.use(express.json({ limit: "20mb" }));

    // Pass app to routes
    routes(this.app);

    this.app.all("*", (req, res) =>
      res.status(404).send({
        status: "error",
        message: "you have entered an incorrect route",
      })
    );
  }

  /**
   * server
   * @param(optional) value Port number
   * @returns server running on the port passed on ENV port
   */
  server(value) {
    // Start application
    const port = value || process.env.PORT;
    return this.app.listen(port, () => {
      //   logger.info(`Express running, now listening on port ${config.port}`);
      console.log(`Express running, now listening on port ${port}`);
    });
  }

  /**
   * @description Default error handler to be used with express
   * @param error Error object
   * @param req {object} Express req object
   * @param res {object} Express res object
   * @param next {function} Express next object
   * @returns {*} errors
   */
  static errorHandler(error, req, res, next) {
    let parsedError;

    // Attempt to gracefully parse error object
    try {
      if (error && typeof error === "object") {
        parsedError = JSON.stringify(error);
      } else {
        parsedError = error;
      }
    } catch (e) {
      console.log(e);
      //   logger.error(e);
    }

    // Log the original error
    // logger.error(parsedError);
    console.log(parsedError);

    // If response is already sent, don't attempt to respond to client
    if (res.headersSent) {
      return next(error);
    }

    // logger.error("Error %o", error);
    console.log(error);
    return res.json(error).status(error.httpStatusCode || 500);
  }
}

export default ExpressLoader;
