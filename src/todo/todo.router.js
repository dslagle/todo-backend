let router = require("express").Router();
let model = require("./todo.model");

router.get("/", function(request, response) {
    model.find({}, (err, items) => {
        if (err) {
            response.status(404).end();
            return;
        }

        response.json(items);
    });
});

router.post("/", function(request, response) {
    let item = new model();
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

router.patch("/:id", function(request, response) {
    model.findById(request.params.id, (err, item) => {
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

router.get("/:id", function(request, response) {
    model.findById(request.params.id, (err, item) => {
        if (err || !item) {
            response.status(404).end();
        }
        else {
            response.json({ error: false, item: item });
        }
    });
});

module.exports = router;