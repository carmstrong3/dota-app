const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000/api/heroes/";

describe("routes : /api/heroes", () => {

  describe("GET /api/heroes", () => {

    it("should return a status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });
});

