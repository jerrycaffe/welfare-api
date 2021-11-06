import request from "supertest";
import app from "../app";
import { invalidPhone, validUserDetail } from "../helpers";
import { createUserV1 } from "../routes";
const { User, sequelize } = require("../../models");

beforeAll(() => {
  sequelize.sync();
  return sequelize.authenticate();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe("Create User", () => {
  it("returns 400 and error message for invalid user detail", async () => {
    const response = await request(app).post(createUserV1).send(invalidPhone);
    expect(response.status && response.body.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
  it("returns 201 and saves username and password to the db", async () => {
    const response = await request(app)
      .post(createUserV1)
      .send(validUserDetail);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("success");
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty("data");
  });
});
