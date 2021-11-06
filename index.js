const app = require("./app");
const PORT = process.env.PORT || 3000;
const { sequelize } = require("./models");

const startDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!!!");
  } catch (error) {
    await sequelize.close();
    console.log(error);
  }
};

startDb();

app.listen(PORT, () => console.log("Server started on port ", PORT));
