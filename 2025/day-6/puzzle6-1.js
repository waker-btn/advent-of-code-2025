import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf-8");
const sampleInput = fs.readFileSync("./sampleInput.txt", "utf-8");

const mathsSheet = input.split("\n").map((row) => row.trim().split(/\s+/));
const mathsProblems = mathsSheet[0].map((_, colIndex) =>
  mathsSheet.map((row) => row[colIndex])
);

//not the most readable, but it works!
const total = mathsProblems.reduce((acc, cur) => {
  return (
    acc +
    eval(
      cur
        .reduce((acc2, cur2) => {
          return acc2 + cur2 + cur[cur.length - 1];
        }, "")
        .slice(0, -3)
    )
  );
}, 0);

console.log(total);
