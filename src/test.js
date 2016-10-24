(function x() {
    bar.x = "ha";
    this.x = "haha!";
    this.foo = () => console.log(this);
    var x = 5;

    this.foo();
    //this.bar();

    function bar() {
        console.log(this);
        console.log("Bar!");
    }
})();