const test = require("node:test");
const { describe, it } = require("node:test");
const assert = require("assert");
const { Calculator } = require("./main");

/*
1. (40%) Write test cases in `main_test.js` and achieve 100% code coverage.
2. (30%) For each function, parameterize their testcases to test the error-results.
3.(30 %) For each function, use at least 3 parameterized testcases to test the non - error - results.
*/

// TODO: write your tests here

// describe() for grouping related test cases
describe("Calculator", () => {
  const calculator = new Calculator();

  describe("exp function", () => {
    const validParams = [
      { input: 0, expected: 1 },
      { input: 1, expected: Math.exp(1) },
      { input: -2, expected: Math.exp(-2) },
    ];
    const errParams = [
      { input: Infinity, message: "unsupported operand type" },
      { input: NaN, message: "unsupported operand type" },
    ];

    validParams.forEach(({ input, expected }) => {
      test("Test non-error-results", () => {
        assert.strictEqual(calculator.exp(input), expected);
      });
    });

    errParams.forEach(({ input, message }) => {
      test("Test error-results", () => {
        assert.throws(() => calculator.exp(input), new Error(message));
      });
    });

    test("Test to trigger overflow", () => {
      assert.throws(() => calculator.exp(1000), new Error("overflow"));
    });
  });

  describe("log function", () => {
    const validParams = [
      { input: 1, expected: 0 },
      { input: 10, expected: Math.log(10) },
      { input: 100, expected: Math.log(100) },
    ];

    const errParams = [
      { input: Infinity, message: "unsupported operand type" },
      { input: -Infinity, message: "unsupported operand type" },
      { input: 0, message: "math domain error (1)" },
      { input: NaN, message: "unsupported operand type" },
      { input: -1, message: "math domain error (2)" },
    ];

    validParams.forEach(({ input, expected }) => {
      test("Test non-error-results", () => {
        assert.strictEqual(calculator.log(input), expected);
      });
    });

    errParams.forEach(({ input, message }) => {
      test("Test error-results", () => {
        assert.throws(() => calculator.log(input), new Error(message));
      });
    });
  });
});
