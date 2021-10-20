const request = require("supertest");
const app = require("../app");
const { User, sequelize } = require("../models");

beforeAll(() => {
  sequelize.sync();
  return sequelize.authenticate();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

it("returns 201 ok when signup request is valid", async () => {
  const response = await request(app).post("/api/1.0/users").send({
    firstName: "user1",
    lastName: "user2",
    email: "user1@mail.com",
    password: "adedayo",
    phoneNumber: "+2348088492993",
  });
  // console.log(response);
  expect(response.status).toBe(201);
});
it("saves username and password to the db", async () => {
  const response = await request(app).post("/api/1.0/users").send({
    firstName: "ade",
    lastName: "damola",
    email: "user@gmail.com",
    password: "adedayo",
  });
  const user = await User.findAll();

  // expect(user[0].firstName).toBe("user1");
});
