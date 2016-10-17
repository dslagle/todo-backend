var chaiPost = require("chai");
var chaiHttp = require("chai-http");
var expect = chaiPost.expect;

chaiPost.use(chaiHttp);

describe("post todo test", function () {
    var server = require("../server");

    before(function () {
        //autoformat
    });

    it("get request to todo should return 200 OK with json", function (done) {
        chaiPost.request(server)
            .get("/todo")
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });

    it("post /todo should return 200 OK with saved item and no error", function (done) {
        chaiPost.request(server)
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
        chaiPost.request(server)
            .get("/fib/10")
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.result).to.have.length(10);
                done();
            });

        chaiPost.request(server)
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