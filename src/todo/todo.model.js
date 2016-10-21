var mongoose = require("mongoose");

var todoSchema = mongoose.Schema({
    description: String,
    completed: Boolean,
    order: Number
});

module.exports = mongoose.model("Todo", todoSchema);