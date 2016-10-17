let app = require("express")();
let bp = require("body-parser");
let path = require("path");
let math = require("./math");
let db = require("mongoose");
let todo = require("./todo");

const address = "0.0.0.0";
const port = 22000;

const mongo = "mongodb://127.0.0.1/todo";
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

app.get("/todo", function(request, response) {
    todo.find({}, (err, items) => {
        if (err) {
            response.status(404).end();
            return;
        }

        response.json(items);
    });
});

app.post("/todo", function(request, response) {
    let item = new todo();
    item.description = request.body.description;
    item.completed = request.body.completed;
    item.order = request.body.order;

    item.save((err, item) => {
        if (err) {
            response.json({ error: true, message: "Unable to save todo item" });
            console.log(err);
        }
        else {
            response.json({ error: false, item: item });
            console.log("Item saved.");
        }
    });
});

app.patch("/todo/:id", function(request, response) {
    todo.findById(request.params.id, (err, item) => {
        if (err) {
            response.status(404).end();
        }
        else {
            item.description = request.body.description;
            item.completed = request.body.completed;
            item.order = request.body.order;

            item.save((err, saved) => {
                if (err) {
                    response.json({ error: true, message: "Unable to update item" });
                }
                else {
                    response.json({ error: false, item: saved });
                }
            });
        }
    });
});

app.get("/fib/:num", function(request, response) {
    let num = request.params.num;
    response.json({ result: math.fib(num) });
});

module.exports = app.listen(port, address, function() {
    console.log(`Listening on http:\\\\${address}:${port}`);
});
