let router = require("express").Router();
let math = require("./math");

router.get("/fib/:num", function(request, response) {
    let num = request.params.num;
    response.json({ result: math.fib(num) });
});

module.exports = router;