import { input } from "./puzzle1-1-input.js";

const instructions = input.split(" ");
let dialPointer = 50;
let zeroCounter = 0;

function moveLeft(move) {
  const movement = parseInt(move);
  dialPointer -= movement;
  correctDial();
}

function moveRight(move) {
  const movement = parseInt(move);
  dialPointer += movement;
  correctDial();
}

function correctDial() {
  while (dialPointer > 99 || dialPointer < 0) {
    if (dialPointer > 99) {
      dialPointer -= 100;
    } else if (dialPointer < 0) {
      dialPointer += 100;
    }
  }
}

function checkZero() {
  dialPointer === 0 ? zeroCounter++ : null;
}

for (const step in instructions) {
  instructions[step].startsWith("L")
    ? moveLeft(instructions[step].slice(1))
    : moveRight(instructions[step].slice(1));

  checkZero();
}

console.log(zeroCounter);
