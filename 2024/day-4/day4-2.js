import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");
const sampleInput = fs.readFileSync("./sampleInput.txt", "utf-8");
const wordsearch = sampleInput.split("\n").map((row) => row.split(""));
const word = ["M", "A", "S"];
let count = 0;

for (let y = 0; y < wordsearch.length; y++) {
  for (let x = 0; x < wordsearch[0].length; x++) {
    if (wordsearch[y][x] === word[1]) checkSurroundings(x, y);
  }
}

function checkSurroundings(x, y) {
  if (y !== 0 && y !== wordsearch.length - 1) {
    if (x !== 0 && x !== wordsearch[0].length - 1) {
      switch (wordsearch[y + 1][x + 1]) {
        case "M":
          if (wordsearch[y - 1][x - 1] !== "S") return;
          break;
        case "S":
          if (wordsearch[y - 1][x - 1] !== "M") return;
          break;
      }
      switch (wordsearch[y - 1][x + 1]) {
        case "M":
          if (wordsearch[y + 1][x - 1] !== "S") return;
          break;
        case "S":
          if (wordsearch[y + 1][x - 1] !== "M") return;
          break;
      }
      return count++;
    }
  }
}

// hitting multiple cases??? added break, still wrong 

console.log(count);
