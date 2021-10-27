import "babel-polyfill";
const request = require("supertest");
const { app } = require("../index");

describe("API Call Test", () => {
  test("Not Found if there is no response", (done) => {
    request(app)
      .get("/call-api")
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
  test("redirecting to index.html", (done) => {
    request(app)
      .get("/")
      .send("./dist/index.html")
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      });
  });
  test("giving error if wrong path", (done) => {
    request(app)
      .get("/response")
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});
