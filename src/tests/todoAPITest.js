var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;

chai.use(chaiHttp);

describe("post todo test", function () {
    var server = require("../server");

    before(function () {
        //autoformat
    });

    it("get request to todo should return 200 OK with json", function (done) {
        chai.request(server)
            .get("http://127.0.0.1/todo")
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
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

    it("get /fib/x should return an array of numbers representing the fibinacci sequence with x elements", function (done) {
        chai.request(server)
            .get("/fib/10")
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.result).to.have.length(10);
                done();
            });

        chai.request(server)
            .get("/fib/0")
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.result).to.have.length(0);
                done();
            });
    });
});