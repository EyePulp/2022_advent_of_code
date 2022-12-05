// day3 advent of code
const __dirname = new URL(".", import.meta.url).pathname;
import { chunk } from "https://deno.land/std@0.167.0/collections/mod.ts";
const text = await Deno.readTextFile(__dirname + "data.txt");
// const text = await Deno.readTextFile(__dirname + "testdata.txt");
const rucks = text.split("\n").filter(Boolean).map(
  (r) => [r.slice(0, r.length / 2), r.slice(r.length / 2)],
);

function priority(char) {
  // Lowercase item types a through z have priorities 1 through 26.
  // Uppercase item types A through Z have priorities 27 through 52.
  return "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char);
}

const tally1 = rucks.reduce((a, [r0, r1]) => {
  for (const i of r0) {
    if (r1.indexOf(i) > -1) {
      a += priority(i);
      break;
    }
  }
  return a;
}, 0);

console.log("Part 1", tally1);

const tally2 = chunk(rucks, 3).reduce((a, [r0, r1, r2]) => {
  for (const i of r0.join("")) {
    if (r1.join("").indexOf(i) > -1 && r2.join("").indexOf(i) > -1) {
      a += priority(i);
      break;
    }
  }
  return a;
}, 0);

console.log("Part 2", tally2);
