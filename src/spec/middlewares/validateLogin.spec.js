import request from "supertest";
import app from "../app";

import { loginUserV1 } from "../routes";

describe("validate user login", () => {
  it("returns error and 400 status when any required field is missing", async () => {
    const response = await request(app).post(loginUserV1).send({});

    expect(response.status && response.body.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("The phoneNumber field is required.");
  });
  it("returns error message and 400 status when any field is invalid", async () => {
    const response = await request(app)
      .post(loginUserV1)
      .send({ phoneNumber: "808849299", password: "adedayo1994" });

    expect(response.status && response.body.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "The phoneNumber must be at least 10 characters."
    );
  });
  it("returns error message and 400 status when password field not valid", async () => {
    const response = await request(app)
      .post(loginUserV1)
      .send({ phoneNumber: "8088492993", password: "adedayo" });

    expect(response.status && response.body.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "The password must be at least 8 characters."
    );
  });
  it("returns error message and 400 status when password field not valid", async () => {
    const response = await request(app)
      .post(loginUserV1)
      .send({ phoneNumber: "8088492993", password: "adedayohhhhhhhhh" });

    expect(response.status && response.body.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("The password format is invalid.");
  });
});
