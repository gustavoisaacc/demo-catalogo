import { request } from "supertest";
import { app } from "./app.js";

describe("POST /api/v1/register", () => {
  it("should create a new registration", async () => {
    const res = await request(app).post("/api/v1/register").send({
      name: "gustavo",
      password: "123456",
      email: "gustavo@gustavo.com",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("username");
    expect(res.body).toHaveProperty("email");
    expect(typeof res.body.id).toBe("string");
    expect(typeof res.body.username).toBe("string");
    expect(typeof res.body.email).toBe("string");
    expect(res.body.email).toBe("gustavo@gustavo.com");

    expect(res.status).not.toBe(404);
  });
});
