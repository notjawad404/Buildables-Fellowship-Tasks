// Variables
console.log("--- Variables ---\n");
let name = "Alice";
const age = 25;
var isStudent = true;
console.log("Name:", name);
console.log("Age:", age);
console.log("Is Student:", isStudent);

// Data Types
console.log("\n--- Data Types ---\n");
let numberType = 42;
let stringType = "Hello";
let booleanType = false;
let nullType = null;
let undefinedType;
let objectType = { key: "value" };
let arrayType = [1, 2, 3];

console.log("Number:", numberType, "Type:", typeof numberType);
console.log("String:", stringType, "Type:", typeof stringType);
console.log("Boolean:", booleanType, "Type:", typeof booleanType);
console.log("Null:", nullType, "Type:", typeof nullType);
console.log("Undefined:", undefinedType, "Type:", typeof undefinedType);
console.log("Object:", objectType, "Type:", typeof objectType);
console.log("Array:", arrayType, "Type:", typeof arrayType);

// Operators
console.log("\n--- Operators ---\n");
let sum = 5 + 3;
let difference = 10 - 4;
let product = 6 * 2;
let quotient = 20 / 5;
let remainder = 10 % 3;
let exponent = 2 ** 3;

console.log("Sum:", sum);
console.log("Difference:", difference);
console.log("Product:", product);
console.log("Quotient:", quotient);
console.log("Remainder:", remainder);
console.log("Exponent:", exponent);

// Type Conversions
console.log("\n--- Type Conversions ---\n");
let numFromString = Number("123");
let strFromNum = String(456);
let boolFromNum = Boolean(0);

console.log("Number from string:", numFromString, "Type:", typeof numFromString);
console.log("String from number:", strFromNum, "Type:", typeof strFromNum);
console.log("Boolean from number:", boolFromNum, "Type:", typeof boolFromNum);

// Equality and Comparisons
console.log("\n--- Equality and Comparisons ---\n");
console.log("Loose equality (5 == '5'):", 5 == "5");
console.log("Strict equality (5 === '5'):", 5 === "5");
console.log("Not equal (5 != '5'):", 5 != "5");
console.log("Strict not equal (5 !== '5'):", 5 !== "5");
console.log("Greater than (10 > 5):", 10 > 5);
console.log("Less than (5 < 10):", 5 < 10);
console.log("Greater or equal (10 >= 10):", 10 >= 10);
console.log("Less or equal (7 <= 10):", 7 <= 10);
console.log("Not greater (5 <= 5):", !(5 > 5));
console.log("Not less (5 >= 5):", !(5 < 5));

// Conditional statements
console.log("\n--- Conditional Statements ---\n");
if (age > 18) {
  console.log("Adult");
} else if (age === 18) {
  console.log("Just became an adult");
} else {
  console.log("Minor");
}

// Loops
console.log("\n--- Loops ---\n");
let numbers = [1, 2, 3, 4, 5];

// For loop
for (let i = 0; i < numbers.length; i++) {
  console.log("For loop:", numbers[i]);
}

//While loop
let j = 0;
while (j < numbers.length) {
  console.log("While loop:", numbers[j]);
  j++;
}

// Do while loop
let k = 0;
do {
  console.log("Do...while loop:", numbers[k]);
  k++;
} while (k < numbers.length);

// For of loop
for (let num of numbers) {
  console.log("For...of loop:", num);
}

// For in loop
for (let index in numbers) {
  console.log("For...in loop:", index, numbers[index]);
}

// Functions
console.log("\n--- Functions ---\n");
// Simple function
function greet(user) {
  return "Hello " + user;
}
console.log(greet("Alice"));

// Function expression
const square = function (n) {
  return n * n;
};
console.log("Square of 5:", square(5));

// Arrow function
const multiply = (a, b) => a * b;
console.log("Multiply 3 * 4:", multiply(3, 4));

// Scope
console.log("\n--- Scope ---\n");
let globalVar = "I'm global";

function testScope() {
  let localVar = "I'm local";
  console.log(globalVar);
  console.log(localVar);
}
testScope();

{
  let blockVar = "I'm block scoped";
  var functionVar = "I'm function scoped";
  console.log(blockVar);
}
console.log(functionVar);