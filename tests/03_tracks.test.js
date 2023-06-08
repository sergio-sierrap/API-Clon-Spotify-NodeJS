const request = require("supertest");
const app = require("../app");
const { tokenSign } = require("../src/services/jwtService");
const { userModel } = require("../src/models/users");
const { storageModel }  = require("../src/models/storage");
const { tracksModel } = require("../src/models/tracks");
const { testAuthRegisterAdmin, testDataTrack, testStorageRegister } = require("./helper/helperData");

let STORAGE_ID = "";
let JWT_TOKEN = "";

beforeAll(async () => {
  await userModel.deleteMany({});
  await storageModel.deleteMany({});
  const user = await userModel.create(testAuthRegisterAdmin);
  const storage = await storageModel.create(testStorageRegister);
  STORAGE_ID = storage._id.toString();
  JWT_TOKEN = await tokenSign(user);
});

// POST TRACK
test("It should register a track", async () => {
  const dataTracksNew = { 
    ...testDataTrack, 
    mediaId: STORAGE_ID };

  const res = await request(app)
    .post("/api/tracks")
    .set("Authorization", `Bearer ${JWT_TOKEN}`)
    .send(dataTracksNew);
  const { body } = res;
  expect(res.statusCode).toEqual(201);
  expect(body).toHaveProperty("data");
  expect(body).toHaveProperty("data.name");
  expect(body).toHaveProperty("data.artist");
  expect(body).toHaveProperty("data.cover");
});

// GET ALL TRACKS
test("It should return all the tracks", async () => {
  const res = await request(app)
    .get("/api/tracks")
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  const { data } = body;
  //   idFile = data.docs[0]._id;
  expect(body).toHaveProperty("data");
});

// GET TRACK DETAIL
test("It should return the detail of the track", async () => {
  const { _id } = await tracksModel.findOne({});
  id = _id.toString();
  const res = await request(app)
    .get(`/api/tracks/${id}`)
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
});

// DELETE TRACK
test("It should delete the track", async () => {
  const { _id } = await tracksModel.findOne({});
  id = _id.toString();
  const res = await request(app)
    .delete(`/api/tracks/${id}`)
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
  expect(body).toHaveProperty("data.deleted", 1);
});
