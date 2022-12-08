// day4 advent of code
const __dirname = new URL(".", import.meta.url).pathname;
import { intersect } from "https://deno.land/std@0.167.0/collections/intersect.ts";

const text = await Deno.readTextFile(__dirname + "data.txt");
// const text = await Deno.readTextFile(__dirname + "testdata.txt");

function arrayFromNums([start, end]: number[]) {
  // console.log(start, end);
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

const ranges = text.split("\n").filter(Boolean).map((r) => {
  const [r0, r1] = r.split(",");

  return [
    arrayFromNums(r0.split("-").map((i) => parseInt(i))),
    arrayFromNums(r1.split("-").map((i) => parseInt(i))),
  ];
});

const tally1 = ranges.reduce((a, [r0, r1]) => {
  if ([r0.length, r1.length].includes(intersect(r0, r1).length)) {
    a += 1;
  }
  return a;
}, 0);

console.log("Part 1", tally1);

const tally2 = ranges.reduce((a, [r0, r1]) => {
  a += intersect(r0, r1).length > 0 ? 1 : 0;
  return a;
}, 0);

console.log("Part 2", tally2);
