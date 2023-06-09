const request = require("supertest");
const { userModel } = require("../src/models/users");
const { testAuthLogin, testAuthRegister } = require("./helper/helperData");
const app = require("../app");
const mongoose = require("mongoose");

beforeEach(async () => {
  const DB_URI = process.env.DB_URI
  console.log(DB_URI);
  mongoose.set("strictQuery", false);
  await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});
  
  test("It should return a 404 - [Auth-Login]: User doesn't exist", async () => {
    await userModel.deleteMany({});
    const userDoesntExist = {
      email: "test@test.com",
      password: "12345678",
    }
    const response = await request(app)
      .post("/api/auth/login")
      .send(userDoesntExist);
  
    expect(response.statusCode).toEqual(404);
  });
  
  test("It should return a 201 - [Auth-Register]: User register succesfully", async () => {
    const userToRegister = {
      name: "User test",
      age: 20,
      email: "test@test.com",
      password: "12345678",
    }
    const response = await request(app)
      .post("/api/auth/register")
      .send(userToRegister);
  
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("data.token");
    expect(response.body).toHaveProperty("data.user");
  });
  
  
  test("It should return a 401 - [Auth-Login]: Invalid password", async () => {
    const userToRegister = {
      name: "User test",
      age: 20,
      email: "test@test.com",
      password: "12345678"
    }
    const newTestAuthLogin = {...userToRegister, password:"22222222"}
    const response = await request(app)
      .post("/api/auth/login")
      .send(newTestAuthLogin);
  
    expect(response.statusCode).toEqual(401);
  });
  
  test("It should return a 200 - [Auth-Login]: User login Successfully", async () => {
    const userToLogin = {
      email: "test@test.com",
      password: "12345678"
    }
    const response = await request(app)
      .post("/api/auth/login")
      .send(userToLogin);
  
    expect(response.statusCode).toEqual(200);
  });

  afterEach(async () => {
    await mongoose.connection.close();
  })