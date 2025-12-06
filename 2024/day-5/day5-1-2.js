import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");
const sampleInput = fs.readFileSync("./sampleInput.txt", "utf-8");

const rules = input
  .split("\n\n")[0]
  .split("\n")
  .map((line) => line.split("|").map(Number));

const instructions = input
  .split("\n\n")[1]
  .split("\n")
  .map((line) => line.split(",").map(Number));

// create an map with a point system for order rules
function createOrderMap(instruction) {
  const finalOrder = new Map();
  rules.forEach(([before, after]) => {
    if (instruction.includes(before) && instruction.includes(after)) {
      if (!finalOrder.has(before)) {
        finalOrder.set(before, -1);
      } else {
        finalOrder.set(before, finalOrder.get(before) - 1);
      }
      if (!finalOrder.has(after)) {
        finalOrder.set(after, 1);
      } else {
        finalOrder.set(after, finalOrder.get(after) + 1);
      }
    }
  });
  return finalOrder;
}

function sortInvalid(finalOrder) {
  const sorted = Array.from(finalOrder).sort((a, b) => a[1] - b[1]);
  return sorted[Math.floor(sorted.length / 2)][0];
}

// check instructions against finalOrder
let validMiddleTotal = 0;
let invalidMiddleTotal = 0;

instructions.forEach((instruction) => {
  const finalOrder = createOrderMap(instruction);
  let isValid = true;
  for (let i = 0; i < instruction.length - 1; i++) {
    if (finalOrder.has(instruction[i]) && finalOrder.has(instruction[i + 1])) {
      if (finalOrder.get(instruction[i]) > finalOrder.get(instruction[i + 1])) {
        isValid = false;
      }
    }
  }
  isValid
    ? (validMiddleTotal += instruction[Math.floor(instruction.length / 2)])
    : (invalidMiddleTotal += sortInvalid(finalOrder));
});

console.log(validMiddleTotal);
console.log(invalidMiddleTotal);
