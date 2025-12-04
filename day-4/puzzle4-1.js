import fs from "fs";

const input = fs.readFileSync("./puzzle4-input.txt", "utf-8");
const sampleInput = fs.readFileSync("./puzzle4-sampleInput.txt", "utf-8");

const shelves = input.split("\n").map((shelf) => shelf.split(""));
const maxSurroundingRolls = 3;
let totalRolls = 0;

for (let i = 0; i < shelves.length; i++) {
  for (let j = 0; j < shelves[i].length; j++) {
    if (shelves[i][j] === "@") {
      checkSurroundings(j, i);
    }
  }
}

function checkSurroundings(x, y) {
  let count = 0;
  for (let ty = -1; ty <= 1; ty++) {
    if (y + ty >= 0 && y + ty < shelves.length) {
      for (let tx = -1; tx <= 1; tx++) {
        if (x + tx >= 0 && x + tx < shelves[y].length) {
          if (!(ty === 0 && tx === 0)) {
            if (shelves[y + ty][x + tx] === "@") {
              count++;
            }
          }
        }
      }
    }
  }
  if (count <= maxSurroundingRolls) {
    totalRolls++;
  }
}

console.log(totalRolls);
