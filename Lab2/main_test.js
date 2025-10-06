const fs = require("fs");
const originalReadFile = fs.readFile;
fs.readFile = (path, encoding, callback) => {
  callback(null, "Bob\nAnna");
};

const test = require("node:test");
const assert = require("assert");
const { Application, MailSystem } = require("./main");

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary
test("Test MailSystem's write", () => {
  const mailSystem = new MailSystem();
  const context = mailSystem.write("Bob");

  assert.strictEqual(context, "Congrats, Bob!");
});

test("Test MailSystem's send", () => {
  const mailSystem = new MailSystem();
  const context = mailSystem.write("Bob");
  const result = mailSystem.send("Bob", context);

  assert.strictEqual(typeof result, "boolean");
});

test("Test MailSystem's send success (stub)", () => {
  const mailSystem = new MailSystem();
  const context = mailSystem.write("Bob");
  const originalRandom = Math.random;
  Math.random = () => 0.8;
  const result = mailSystem.send("Bob", context);

  assert.strictEqual(result, true);
  Math.random = originalRandom;
});

test("Test MailSystem's send failure (stub)", () => {
  const mailSystem = new MailSystem();
  const context = mailSystem.write("Bob");

  const originalRandom = Math.random;
  Math.random = () => 0.3;
  const result = mailSystem.send("Bob", context);

  assert.strictEqual(result, false);
  Math.random = originalRandom;
});

// Application tests

test("Test Application's constructor that loads ppl from file (stub)", async () => {
  try {
    const app = new Application();
    await new Promise((resolve) => setTimeout(resolve, 50));
    assert.deepStrictEqual(app.people, ["Bob", "Anna"]);
    assert.deepStrictEqual(app.selected, []);
  } finally {
  }
  fs.readFile = originalReadFile;
});

test("Test Application's getNames (mock)", async () => {
  try {
    const app = new Application();
    const [people, selected] = await app.getNames();
    app.people = people;
    app.selected = selected;
    assert.deepStrictEqual(app.people, ["Bob", "Anna"]);
    assert.deepStrictEqual(app.selected, []);
  } finally {
    fs.readFile = originalReadFile;
  }
});

test("Test Application's getRandomPerson ", async () => {
  const app = new Application();
  app.people = ["Anna", "Bob"];
  const person = app.getRandomPerson();

  assert.ok(app.people.includes(person));
});

test("Test Application's selectNextPerson if all selected", async () => {
  const app = new Application();
  app.people = ["Anna", "Bob"];
  app.selected = ["Anna", "Bob"];
  const result = app.selectNextPerson();

  assert.strictEqual(result, null);
});

test("Test Application's selectNextPerson if not all selected", async () => {
  const app = new Application();
  app.people = ["Anna", "Bob"];
  app.selected = ["Anna"];
  const person = app.selectNextPerson();

  assert.strictEqual(person, "Bob");
  assert.deepStrictEqual(app.selected, ["Anna", "Bob"]);
});

test("Test Application's selectNextPerson if person selected (stub)", async () => {
  const app = new Application();
  app.people = ["Anna", "Bob"];
  app.selected = ["Anna"];

  const originalRandomPerson = app.getRandomPerson;
  let callCount = 0;
  app.getRandomPerson = () => {
    if (callCount === 0) {
      callCount++;
      return "Anna";
    } else {
      return "Bob";
    }
  };

  const person = app.selectNextPerson();
  assert.strictEqual(person, "Bob");

  app.getRandomPerson = originalRandomPerson;
});

test("Test Application's notifySelected (spy)", async () => {
  const app = new Application();
  app.people = ["Anna", "Bob"];
  app.selected = ["Anna", "Bob"];

  const originalWrite = app.mailSystem.write;
  const originalSend = app.mailSystem.send;

  let writeCallCount = 0;
  let sendCallCount = 0;

  app.mailSystem.write = (...args) => {
    writeCallCount++;
  };

  app.mailSystem.send = (...args) => {
    sendCallCount++;
    return true;
  };

  app.notifySelected();

  assert.strictEqual(writeCallCount, 2);
  assert.strictEqual(sendCallCount, 2);
  app.mailSystem.write = originalWrite;
  app.mailSystem.send = originalSend;
});
