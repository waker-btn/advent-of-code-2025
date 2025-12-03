import fs from "fs";

const input = fs.readFileSync("./puzzle2-1-input.txt", "utf-8");
const sampleInput = fs.readFileSync("./puzzle2-1-sampleInput.txt", "utf-8");

const ranges = input.split(",");
let runningTotal = 0;

function checkValue(value) {
  const stringValue = value.toString();
  const length = stringValue.length;

  //ignore numbers with an odd number of digits
  if (length % 2 !== 0) {
    return;
  }

  //check if digits are repeated twice
  const firstHalf = stringValue.slice(0, length / 2);
  const secondHalf = stringValue.slice(length / 2);

  if (firstHalf === secondHalf) {
    runningTotal += value;
  }
}

for (const range of ranges) {
  const limits = range.split("-");

  //create an array of numbers for the range
  const numbers = Array.from(
    {
      length: Math.ceil(parseInt(limits[1]) - parseInt(limits[0]) + 1),
    },
    (unused, i) => parseInt(limits[0]) + i
  );

  //check each value
  for (const value of numbers) {
    checkValue(value);
  }
}

console.log(runningTotal);
