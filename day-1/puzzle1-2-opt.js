import { sampleData, input } from "./puzzle1-1-input.js";

const instructions = input.split(" ");
let position = 50;
let zeroCount = 0;

for (const instruction of instructions) {
  const direction = instruction[0] === "L" ? -1 : 1;
  const distance = parseInt(instruction.slice(1));

  for (let i = 0; i < distance; i++) {
    position = (position + direction + 100) % 100;
    if (position === 0) zeroCount++;
  }
}

console.log(zeroCount);
