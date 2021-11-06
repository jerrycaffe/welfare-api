import { db } from "./models";
import ExpressLoader from "./loaders/express";

// import logger from "./services/Logger";

const connectDb = async () => {
  try {
    // await db.sequelize.authenticate();
    const loadExpress = new ExpressLoader();
    loadExpress.server(3000);
    // logger.info("Connection to DB has been established successfully.");
  } catch (error) {
    console.error(error);
    // logger.error("Unable to connect to the database:", err);
  }
};

connectDb();
