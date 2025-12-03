import { sampleData, input } from "./puzzle1-1-input.js";

const instructions = input.split(" ");
let dialPointer = 50;
let zeroCounter = 0;

function moveLeft(move) {
  const movement = parseInt(move);
  for (let step = 0; step < movement; step++) {
    dialPointer -= 1;
    correctDial();
    checkZero();
  }
}

function moveRight(move) {
  const movement = parseInt(move);
  for (let step = 0; step < movement; step++) {
    dialPointer += 1;
    correctDial();
    checkZero();
  }
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

for (const step of instructions) {
  step.startsWith("L") ? moveLeft(step.slice(1)) : moveRight(step.slice(1));
}

console.log(zeroCounter);
