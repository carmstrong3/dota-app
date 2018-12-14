const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000/";

describe("routes : static", () => {

// describe GET route
  describe("GET /", () => {

// define what this spec should do
    it("should return status code 200", (done) => {

// expect the statusCode to be 200
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);

// tell jasmine test is completed
        done();
      });
    });

  });
});
