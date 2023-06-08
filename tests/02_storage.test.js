const request = require("supertest");
const app = require("../app");
const { tokenSign } = require("../src/services/jwtService");
const { testAuthRegister } = require("./helper/helperData")
const { userModel } = require("../src/models/users");
const { storageModel } = require("../src/models/storage");
let JWT_TOKEN = "";
const filePath = `${__dirname}/dump/track.mp3`;

beforeAll(async () => {
  await userModel.deleteMany({});
  await storageModel.deleteMany({});
  const user = userModel.create(testAuthRegister);
  JWT_TOKEN = await tokenSign(user);
});

// UPLOAD ITEM
test("It should upload a file", async () => {
  const res = await request(app)
    .post("/api/storage")
    .set("Authorization", `Bearer ${JWT_TOKEN}`)
    .attach("myfile", filePath);
  const { body } = res;
  expect(res.statusCode).toEqual(201);
  expect(body).toHaveProperty("data");
  expect(body).toHaveProperty("data.url");
});

//GET ALL ITEMS
test("It should create a return of all files", async () => {
  const res = await request(app)
    .get("/api/storage")
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  const { data } = body;
  expect(body).toHaveProperty("data");
});

// GET ITEM DETAIL
test("It should return all the detail of the file", async () => {
  const { _id } = await storageModel.findOne();
  id = _id.toString();

  const res = await request(app)
    .get(`/api/storage/${id}`)
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
});

// DELETE ITEM
test("It should delete the file", async () => {
  const { _id } = await storageModel.findOne();
  id = _id.toString();

  const res = await request(app)
    .delete(`/api/storage/${id}`)
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
  expect(body).toHaveProperty("data.deleted", 1);
});