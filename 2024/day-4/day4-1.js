import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");
const sampleInput = fs.readFileSync("./sampleInput.txt", "utf-8");
const wordsearch = input.split("\n").map((row) => row.split(""));
const word = ["X", "M", "A", "S"];
let count = 0;

for (let y = 0; y < wordsearch.length; y++) {
  for (let x = 0; x < wordsearch[0].length; x++) {
    if (wordsearch[y][x] === word[0]) checkSurroundings(x, y);
  }
}

function checkSurroundings(x, y) {
  for (let ty = -1; ty <= 1; ty++) {
    if (y + ty >= 0 && y + ty < wordsearch.length) {
      for (let tx = -1; tx <= 1; tx++) {
        if (x + tx >= 0 && x + tx < wordsearch[y].length) {
          if (!(ty === 0 && tx === 0)) {
            if (x + tx * 3 >= 0 && x + tx * 3 < wordsearch[0].length) {
              if (y + ty * 3 >= 0 && y + ty * 3 < wordsearch.length) {
                if (wordsearch[y + ty][x + tx] === word[1])
                  if (wordsearch[y + ty * 2][x + tx * 2] === word[2]) {
                    if (wordsearch[y + ty * 3][x + tx * 3] === word[3]) {
                      count++;
                    }
                  }
              }
            }
          }
        }
      }
    }
  }
}

console.log(count);
