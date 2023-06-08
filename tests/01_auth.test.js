const request = require("supertest");
const { userModel } = require("../src/models/users");
const { testAuthLogin, testAuthRegister } = require("./helper/helperData");
const app = require("../app");

beforeAll(async () => {
    await userModel.deleteMany({});
  });
  
  test("It should return a 404 - Login: User doesn't exist", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send(testAuthLogin);
  
    expect(response.statusCode).toEqual(404);
  });
  
  test("It should return a 201 - Login: User register succesfully", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(testAuthRegister);
  
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("data.token");
    expect(response.body).toHaveProperty("data.user");
  });
  
  
  test("It should return a 401 - Login: Invalid password", async () => {
    const newTestAuthLogin = {...testAuthLogin, password:"22222222"}
    const response = await request(app)
      .post("/api/auth/login")
      .send(newTestAuthLogin);
  
    expect(response.statusCode).toEqual(401);
  });
  
  test("It should return a 200 - Login: User login Successfully", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send(testAuthRegister);
  
    expect(response.statusCode).toEqual(200);
  });