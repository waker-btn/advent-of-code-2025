import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");
const sampleInput = fs.readFileSync("./sample-input.txt", "utf-8");

const allCoords = input.split("\n").map((line) => line.split(",").map(Number));
const allPairs = [];

for (let i = 0; i < allCoords.length - 1; i++) {
  for (let j = i + 1; j < allCoords.length; j++) {
    allPairs.push([allCoords[i], allCoords[j]]);
  }
}

const allAreas = [];

for (const pair of allPairs) {
  const area =
    (Math.abs(pair[0][0] - pair[1][0]) + 1) *
    (Math.abs(pair[0][1] - pair[1][1]) + 1);
  allAreas.push(area);
}

const largestArea = Math.max(...allAreas);
console.log(largestArea);
