import request from "supertest";
import app from "../app";
import {
  emptyFirstName,
  emptyLastName,
  emptyPassword,
  emptyPhone,
  invalidPassword,
  invalidPhone,
} from "../helpers/index";
import { createUserV1 } from "../routes";

describe("Test all create user validation", () => {
  it("should return 400 and error message for empty firstName", async () => {
    const response = await request(app).post(createUserV1).send(emptyFirstName);

    expect(response.body.status && response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("The firstName field is required.");
  });

  it("should return 400 and error message for empty lastName", async () => {
    const response = await request(app).post(createUserV1).send(emptyLastName);

    expect(response.body.status && response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("The lastName field is required.");
  });

  it("should return 400 and error message for empty phone Number ", async () => {
    const response = await request(app).post(createUserV1).send(emptyPhone);

    expect(response.body.status && response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("The phoneNumber field is required.");
  });

  it("should return 400 and error message for phone Number that does not follow a required pattern", async () => {
    const response = await request(app).post(createUserV1).send(invalidPhone);

    expect(response.body.status && response.status).toBe(400);
    expect(response.body).toHaveProperty("message");

    expect(response.body.message).toBe("The phoneNumber format is invalid.");
  });

  it("should return 400 and error message for password is empty", async () => {
    const response = await request(app).post(createUserV1).send(emptyPassword);

    expect(response.body.status && response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("The password field is required.");
  });

  it("should return 400 and error message for incorrect password format", async () => {
    const response = await request(app)
      .post(createUserV1)
      .send(invalidPassword);

    expect(response.body.status && response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("The password format is invalid.");
  });
});
