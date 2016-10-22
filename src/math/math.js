/**
 * Produces an array of fibinacci numbers with x elements
 *
 * @param {number} x the number of values to return from the fibinacci sequence, must be >= 0
 * @return {array} a sequence of x numbers of the fibinacci sequence
 */
function fib(x) {
    if (x < 0) throw new ReferenceError("Cannot return less than 0 values");

    if (x === 0) return [];
    if (x === 1) return [1];
    if (x === 2) return [1, 1];

    let seq = [1, 1];
    let i = 1;
    for (i; i < x - 1; i += 1) {
        seq[i + 1] = seq[i] + seq[i - 1];
    }

    return seq;
}

function average(nums) {
    return nums.reduce((a, b) => a + b) / nums.length;
}

function median(nums) {
    nums = nums.sort((a, b) => a - b);
    
    if (nums.length % 2 === 0) { 
        let i = nums.length / 2;

        return (nums[i] + nums[i - 1]) / 2;
    }
    else {
        return nums[Math.floor(nums.length / 2)];
    }
}

module.exports = { fib: fib, average: average, median: median };
