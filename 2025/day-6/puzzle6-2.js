import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");
const sampleInput = fs.readFileSync("./sampleInput.txt", "utf-8");

const mathsSheet = input.split("\n").map((row) => row.split(""));
const invert = mathsSheet[0].map((_, colIndex) =>
  mathsSheet.map((row) => row[colIndex])
);

const mathsProblems = [];
let accum = [];
let total = 0;

// seperate problems
for (const line of invert) {
  const item = line.join("");
  if (item.trim() === "") {
    mathsProblems.push(accum);
    accum = [];
  } else {
    accum.push(item);
  }
}
if (accum.length) mathsProblems.push(accum);

// solve problems
for (const problem of mathsProblems) {
  const op = problem[0].slice(-1);
  problem[0] = problem[0].slice(0, -1);
  total += problem.reduce((acc, cur) => {
    return eval(acc + op + cur.trim());
  });
}

console.log(total);
