let app = require("express")();
let bp = require("body-parser");
let path = require("path");
let db = require("mongoose");
let fs = require("fs");
let http = require("http");

let todoRouter = require("./todo/todo.router");
let mathRouter = require("./math/math.router");

let cert = {
    key: fs.readFileSync("security/todo.key"),
    cert: fs.readFileSync("security/todo.key.crt")
}

const address = "0.0.0.0";
const port = 22000;

const db_ip = process.env.MONGO_HOST || "localhost";
const mongo = `mongodb://${db_ip}/todo`;

db.Promise = global.Promise;
db.connect(mongo);

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.use(function(request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods",
        "POST, GET, PATH, DELETE, PUT");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use("/todo", todoRouter);
app.use("/math", mathRouter);

//let server = https.createServer(cert, app);
let server = http.createServer(app);

module.exports = server.listen(port, address, function() {
    console.log(`Listening on http:\\\\${address}:${port}`);
});
