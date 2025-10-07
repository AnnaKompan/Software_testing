const test = require("node:test");
const assert = require("assert");
const Calc = require("./Calc");

test("Test Calc add", () => {
  assert.strictEqual(Calc.add(2, 2), 4);
});

test("Test Calc subtract", () => {
  assert.strictEqual(Calc.subtract(5, 2), 3);
});

test("Test Calc multiply", () => {
  assert.strictEqual(Calc.multiply(2, 5), 10);
});

test("Test Calc divide", () => {
  assert.strictEqual(Calc.divide(10, 5), 2);
});

test("Test divide by 0", () => {
  assert.throws(() => Calc.divide(10, 0), /Can't divide by zero/);
});
