// day6 advent of code
const __dirname = new URL(".", import.meta.url).pathname;

const text = await Deno.readTextFile(__dirname + "data.txt");
// const text = await Deno.readTextFile(__dirname + "testdata.txt");

function messageWalk(msg: string, msgLen: number): number[] {
  // test for unique chars: !/(\w).*\1/i.test(str)

  return msg.split("").reduce((a, _, i) => {
    const packet = msg.slice(i, i + msgLen);
    if (!/(\w).*\1/i.test(packet) && packet.length === msgLen) {
      a.push([i + msgLen, packet]);
    }
    return a;
  }, []);
}

// const tally1 = stacks1.map((r) => r.slice(-1)[0]).join("");
console.log("Part 1:", messageWalk(text, 4)[0][0]);

// const tally2 = stacks2.map((r) => r.slice(-1)[0]).join("");
console.log("Part 2:", messageWalk(text, 14)[0][0]);
