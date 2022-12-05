// day1 advent of code
import { sum } from "https://deno.land/x/sum/mod.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const text = await Deno.readTextFile(__dirname + "data.txt");
const sums = text.split("\n\n").reduce((a, v) => {
  a.push(sum(v.split("\n").map((i) => parseInt(i)).filter(Boolean)));
  return a;
}, []).sort().reverse();

const largest = sums[0]; // part 1 answer
const top_3 = sums.slice(0, 3); // part 2 answer

console.log(largest, sum(top_3));
