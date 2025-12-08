import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");
const sampleInput = fs.readFileSync("./sample-input.txt", "utf-8");

const allCoords = input.split("\n").map((line) => line.split(",").map(Number));

const allPairs = [];
const allDistances = [];
const connectionNo = 1000;

for (let i = 0; i < allCoords.length - 1; i++) {
  for (let j = i + 1; j < allCoords.length; j++) {
    allPairs.push([allCoords[i], allCoords[j]]);
  }
}

for (const pair of allPairs) {
  allDistances.push([
    pair,
    Math.sqrt(
      (pair[0][0] - pair[1][0]) ** 2 +
        (pair[0][1] - pair[1][1]) ** 2 +
        (pair[0][2] - pair[1][2]) ** 2
    ),
  ]);
}

const sorted = allDistances.sort((a, b) => a[1] - b[1]).slice(0, connectionNo);

const circuits = [];

for (const connection of sorted) {
  let inCircuit = false;
  let inAnotherCircuit = false;

  for (let i = 0; i < circuits.length; i++) {
    if (
      circuits[i].has(connection[0][0]) &&
      circuits[i].has(connection[0][1])
    ) {
      inCircuit = true;
      break;
    }

    if (circuits[i].has(connection[0][0])) {
      inCircuit = true;
      for (let j = i + 1; j < circuits.length; j++) {
        if (circuits[j].has(connection[0][1])) {
          circuits[i] = circuits[i].union(circuits[j]);
          circuits.splice(j, 1);
          inAnotherCircuit = true;
          break;
        }
      }
      if (!inAnotherCircuit) circuits[i].add(connection[0][1]);
      break;
    }

    if (circuits[i].has(connection[0][1])) {
      inCircuit = true;
      for (let j = i + 1; j < circuits.length; j++) {
        if (circuits[j].has(connection[0][0])) {
          circuits[i] = circuits[i].union(circuits[j]);
          circuits.splice(j, 1);
          inAnotherCircuit = true;
          break;
        }
      }
      if (!inAnotherCircuit) circuits[i].add(connection[0][0]);
      break;
    }
  }

  if (!inCircuit) circuits.push(new Set(connection[0]));
}

const sortedCircuits = circuits.sort((a, b) => b.size - a.size);

console.log(
  sortedCircuits[0].size * sortedCircuits[1].size * sortedCircuits[2].size
);
