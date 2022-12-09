// day5 advent of code
const __dirname = new URL(".", import.meta.url).pathname;

const text = await Deno.readTextFile(__dirname + "data.txt");
// const text = await Deno.readTextFile(__dirname + "testdata.txt");

function rotate(src: string[][], trimChar: string): string[][] {
  return [...src][0].map((_, index) => src.map((row) => row[index]).reverse())
    .map((
      r,
    ) => r.indexOf(trimChar) > -1 ? r.slice(0, r.indexOf(trimChar)) : r);
}

// split the data into stacks and moves
const [rawStacks, rawMoves] = text.split("\n\n");

// get our max row width
const maxWidth = parseInt(
  rawStacks.split("\n").slice(-1)[0].split("").slice(-1)[0],
);

const stacksPass: string[][] = rawStacks
  .split("\n") // break into array by lines
  .slice(0, -1) // remove the bottom line
  .join("\n") // combine back into a multi-row string
  .replace(/    /g, "*") // replace blocks of 4 spaces (empty column) with * for placeholder
  .replace(/ /g, "") // remove individual spaces between columns
  .replace(/\[|\]/g, "") // remove brackets
  .split("\n") // convert to rows
  .map((r) => r.split(""))
  .map((
    r,
  ) => [...r, ...Array.from({ length: maxWidth - r.length }).fill("*")]);

const stacks1 = rotate(stacksPass, "*");

for (const m of rawMoves.split("\n").filter(Boolean)) {
  const [count, src, dest] = m.split(" ").map((i) => parseInt(i)).filter(
    Boolean,
  );
  for (let i = 0; i < count; i++) {
    stacks1[dest - 1].push(stacks1[src - 1].pop());
  }
}
// console.log(stacks.map((r) => r.join(" ")));

const tally1 = stacks1.map((r) => r.slice(-1)[0]).join("");
console.log("Part 1", tally1);

const stacks2 = rotate(stacksPass, "*");

for (const m of rawMoves.split("\n").filter(Boolean)) {
  const [count, src, dest] = m.split(" ").map((i) => parseInt(i)).filter(
    Boolean,
  );
  const moving = stacks2[src - 1].splice(count * -1);
  stacks2[dest - 1] = [...stacks2[dest - 1], ...moving];
}
// console.log(stacks.map((r) => r.join(" ")));

const tally2 = stacks2.map((r) => r.slice(-1)[0]).join("");
console.log("Part 2", tally2);
