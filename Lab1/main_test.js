const test = require("node:test");
const assert = require("assert");
const { MyClass, Student } = require("./main");

test("Test MyClass's addStudent", () => {
  // TODO
  // throw new Error("Test not implemented");
  const myClass = new MyClass();
  const student = new Student();
  student.setName("John");

  const id = myClass.addStudent(student);
  assert.strictEqual(myClass.students.length, 1);
  assert.strictEqual(id, 0);
  const wrong = myClass.addStudent("Ann");
  assert.strictEqual(wrong, -1);
});

test("Test MyClass's getStudentById", () => {
  // TODO
  //   throw new Error("Test not implemented");
  const myClass = new MyClass();
  const student = new Student();
  student.setName("Jane");
  const id = myClass.addStudent(student);
  const result = myClass.getStudentById(id);
  assert.ok(result instanceof Student);
  assert.strictEqual(myClass.students.length - 1, id);
  const wrongResult = myClass.getStudentById(2);
  assert.strictEqual(wrongResult, null);
});

test("Test Student's setName", () => {
  // TODO
  //   throw new Error("Test not implemented");
  const myClass = new MyClass();
  const student = new Student();
  student.setName(1234);
  assert.strictEqual(student.getName(), "");
});

test("Test Student's getName", () => {
  // TODO
  // throw new Error("Test not implemented");
  const student = new Student();
  assert.strictEqual(student.getName(), "");
  student.setName("John");
  assert.strictEqual(student.getName(), "John");
});
