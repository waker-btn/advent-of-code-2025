//will come back to, my logic is flawed for loops, maybe i need to keep track of path + direction and resimulate

import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");
const sampleInput = fs.readFileSync("./sampleInput.txt", "utf-8");

const map = sampleInput.split("\n").map((row) => row.split(""));
let guardStart;
let totalVisited = 0;
let totalPossibleLoops = 0;

for (let row = 0; row < map.length; row++) {
  const found = map[row].findIndex((val) => val === "^");
  if (found !== -1) {
    simulatePath([row, found]);
    break;
  }
}

for (const row of map) {
  for (const cell of row) {
    if (cell === "X") {
      totalVisited++;
    }
  }
}

console.log(totalVisited, totalPossibleLoops);

function simulatePath(guardStart) {
  let guardDir = "^";
  let guardPos = guardStart;
  let guardGone = false;
  while (!guardGone) {
    let move = checkAhead(guardPos, guardDir);
    checkPossibleLoop(guardPos, guardDir);
    if (move) {
      map[guardPos[0]][guardPos[1]] = "X";
      guardPos = moveForward(guardPos, guardDir);
    } else {
      guardDir = turnRight(guardDir);
    }
    if (checkIfLeaving(guardPos, guardDir)) {
      guardGone = true;
      console.log(map.join("\n"));
      map[guardPos[0]][guardPos[1]] = "X";
    }
  }
}

function checkIfLeaving(guardPos, guardDir) {
  switch (guardDir) {
    case "^":
      if (guardPos[0] - 1 < 0) {
        return true;
      }
      break;
    case ">":
      if (guardPos[1] + 1 >= map[0].length) {
        return true;
      }
      break;
    case "V":
      if (guardPos[0] + 1 >= map.length) {
        return true;
      }
      break;
    case "<":
      if (guardPos[1] - 1 < 0) {
        return true;
      }
      break;
  }
  return false;
}

function turnRight(guardDir) {
  switch (guardDir) {
    case "^":
      return ">";
    case ">":
      return "V";
    case "V":
      return "<";
    case "<":
      return "^";
  }
}

function moveForward(guardPos, guardDir) {
  switch (guardDir) {
    case "^":
      guardPos[0] -= 1;
      break;
    case ">":
      guardPos[1] += 1;
      break;
    case "V":
      guardPos[0] += 1;
      break;
    case "<":
      guardPos[1] -= 1;
      break;
  }
  return guardPos;
}

function checkAhead(guardPos, guardDir) {
  switch (guardDir) {
    case "^":
      switch (map[guardPos[0] - 1][guardPos[1]]) {
        case ".":
          return true;
        case "#":
          return false;
        case "X":
          return true;
      }
    case ">":
      switch (map[guardPos[0]][guardPos[1] + 1]) {
        case ".":
          return true;
        case "#":
          return false;
        case "X":
          return true;
      }
    case "V":
      switch (map[guardPos[0] + 1][guardPos[1]]) {
        case ".":
          return true;
        case "#":
          return false;
        case "X":
          return true;
      }
    case "<":
      switch (map[guardPos[0]][guardPos[1] - 1]) {
        case ".":
          return true;
        case "#":
          return false;
        case "X":
          return true;
      }
  }
}

function checkPossibleLoop(guardPos, guardDir) {
  switch (guardDir) {
    case "^":
      if (
        map[guardPos[0] - 1][guardPos[1]] === "X" &&
        map[guardPos[0] - 1][guardPos[1] + 1] === "X"
      ) {
        totalPossibleLoops++;
      }
      break;
    case ">":
      if (
        map[guardPos[0]][guardPos[1] + 1] === "X" &&
        map[guardPos[0] + 1][guardPos[1] + 1] === "X"
      ) {
        totalPossibleLoops++;
      }
      break;
    case "V":
      if (
        map[guardPos[0] + 1][guardPos[1]] === "X" &&
        map[guardPos[0] + 1][guardPos[1] - 1] === "X"
      ) {
        totalPossibleLoops++;
      }
      break;
    case "<":
      if (
        map[guardPos[0]][guardPos[1] - 1] === "X" &&
        map[guardPos[0] - 1][guardPos[1] - 1] === "X"
      ) {
        totalPossibleLoops++;
      }
      break;
  }
}
