import request from "supertest";
import app from "../app";
import { invalidPhone, validUserDetail } from "../helpers";
import { createUserV1, loginUserV1 } from "../routes";
const { User, sequelize } = require("../../models");

beforeAll(() => {
  sequelize.sync();
  return sequelize.authenticate();
});
beforeEach(async () => {
  await request(app).post(createUserV1).send({
    phoneNumber: "08088492993",
    firstName: "ade",
    lastName: "jere",
    password: "Adeleye123",
  });
});
afterAll(() => {
  return User.destroy({ truncate: true });
});

describe("Login test", () => {
  it("returns 404 for a user that does not exist", async () => {
    const response = await request(app)
      .post(loginUserV1)
      .send({ phoneNumber: "08088492994", password: "Adedayo123" });
    expect(response.status && response.body.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User does not exist");
  });
  it("returns 200 and a token showing successful login with correct credentials", async () => {
    const response = await request(app)
      .post(loginUserV1)
      .send({ phoneNumber: "08088492993", password: "Adeleye123" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success");
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("token");
    expect(response.body.data).toHaveProperty("phoneNumber");
  });
});
