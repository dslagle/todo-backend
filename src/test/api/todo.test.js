var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;

chai.use(chaiHttp);

let server = require("../../server");

describe("todo items test", function () {
    before(function () {
        //autoformat
    });

    it("get request to todo should return 200 OK with json", function (done) {
        chai.request(server)
            .get("/todo")
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });

    it("get request for non-existent item should return 404 NOT FOUND", function (done) {
        chai.request(server)
            .get("/todo/blahblahidontexist")
            .end(function (err, res) {
                expect(err).not.to.be.null;
                expect(res).to.have.status(404);
                done();
            });
    });

    it("post /todo should return 200 OK with saved item and no error", function (done) {
        chai.request(server)
            .post("/todo")
            .send({ description: "test book", completed: false, order: 2 })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.error).to.equal(false);
                done();
            });
    });
});