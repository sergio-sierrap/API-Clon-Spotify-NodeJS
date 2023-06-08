const request = require("supertest");
const app = require("../app");

describe("[AUTH] This is the test of the endpoint: /api/auth",() => {
    test("This should return a 404", async () => {
        const response = await request(app)
        .post("/api/auth/login")
        .send(
            {
                "email": "test@test.com",
                "password": "2323232322"
            }
        )
        expect(response.statusCode).toEqual(404)
    })
}) 