import supertest from "supertest";
import { describe, expect, test } from "@jest/globals";

import app from "../../app.js";

describe("User API", () => {
  const token = "jwt-token-valido";

  test("POST/users", async () => {
    const result = await supertest(app)
      .post("/users")
      .auth(token, { type: "bearer" })
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "",
        email: "",
        password: "",
      });

    expect(result.statusCode).toBe(201);
  });

  test("GET/users - deve listar usuarios", async () => {
    const result = await supertest(app)
      .get("/users")
      .auth(token, { type: "bearer" })
      .set("Authorization", `Bearer ${token}`);

    expect(result.statusCode).toBe(200);
  });
});
