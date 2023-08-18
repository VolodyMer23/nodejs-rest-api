import mongoose from "mongoose";
import request from "supertest"; // робить http-запит на бекенді
import "dotenv/config";

import app from "../app.js";
import User from "../models/user-db.js";

const { PORT, DB_HOST_TEST } = process.env;

// - the response must have a status code of "200"
// - the response must return a "token"
// - the response must contain object "user" with 2 fields: "email" and "subscription" with data type "String"

describe("test login route", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  // Reset DB
  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test login with correct data", async () => {
    // Request body
    const reqBody = {
      email: "mail@mail.com",
      password: "123456",
    };

    // Creating new User before login test
    const newUser = await User.create({
      email: reqBody.email,
      password: "$2a$10$ifBpz27p0xG.xn0u/HJzsOUyYxFF/3syaqU5NQ8sWEavI9BmRpeMi",
    });

    // Http request with response object = { statusCode, body }
    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send(reqBody);
    console.log("statusCode =>", statusCode);
    console.log("body =>", body);

    // Return code = 200
    expect(statusCode).toBe(200);

    // Return token
    expect(body).toHaveProperty("token");
    expect(body.token).toBeTruthy();
    expect(typeof body.token).toEqual("string");

    // Return object with email and subcription (object type String)
    expect(body).toHaveProperty("user");
    expect(typeof body.user).toEqual("object");
    expect(body.user).toHaveProperty("email");
    expect(body.user).toHaveProperty("subscription");
    expect(typeof body.user.email).toEqual("string");
    expect(typeof body.user.subscription).toEqual("string");

    // Response body.user.email === reqBody.email
    expect(body.user.email).toBe(reqBody.email);

    // Сheck is the user registered in the database (registration step)
    // If the user.email equal the reqBody.email at login
    const user = await User.findOne({ email: reqBody.email });
    expect(user.email).toBe(reqBody.email);
  });
});
