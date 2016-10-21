let router = require("express").Router();

router.get("/fib/:num", function(request, response) {
    let num = request.params.num;
    response.json({ result: math.fib(num) });
});

module.exports = router;