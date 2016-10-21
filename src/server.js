let app = require("express")();
let bp = require("body-parser");
let path = require("path");
let db = require("mongoose");

let todoRouter = require("./todo/todo.router");
let mathRouter = require("./math/math.router");

const address = "localhost";
const port = 22000;

const ip = process.env.MONGO_HOST || "localhost";
const mongo = `mongodb://${ip}/todo`;

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

module.exports = app.listen(port, address, function() {
    console.log(`Listening on http:\\\\${address}:${port}`);
});
