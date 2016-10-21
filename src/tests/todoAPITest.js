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
            .get("/todo")
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

    it("get /math/fib/x should return an array of numbers representing the fibinacci sequence with x elements", function (done) {
        chai.request(server)
            .get("/math/fib/10")
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.result).to.have.length(10);
                done();
            });
    });

    it("get /math/fib/0 should return an empty array", function (done) {
        chai.request(server)
            .get("/math/fib/0")
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.result).to.have.length(0);
                done();
            });
    });

    it("get /math/average/1,2,3,4,5,6,7,8 should return 4.5", function (done) {
        chai.request(server)
            .get("/math/average/1,2,3,4,5,6,7,8")
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.result).to.equal(4.5);
                done();
            });
    });

    it("get /math/average/8 should return 8", function (done) {
        chai.request(server)
            .get("/math/average/8")
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.result).to.equal(8);
                done();
            });
    });

    it("get /math/median/3,7,2,6,4,9,12,43,2 should return 6", function (done) {
        chai.request(server)
            .get("/math/median/3,7,2,6,4,9,12,43,2")
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.result).to.equal(6);
                done();
            });
    });

    it("get /math/median/1,2,3,4 should return 2.5", function (done) {
        chai.request(server)
            .get("/math/median/1,2,3,4")
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.result).to.equal(2.5);
                done();
            });
    });
});