
// day2 advent of code
const __dirname = new URL('.', import.meta.url).pathname;
const text = await Deno.readTextFile(__dirname + "data.txt");
// const text = `A Y\nB X\nC Z`;

// A:R B:P C:S
// X:R:1 Y:P:2 Z:S:3
let scores = {
    AX: 4, AY: 8, AZ: 3,
    BX: 1, BY: 5, BZ: 9,
    CX: 7, CY: 2, CZ: 6,
}

// first half
const tally1 = text.split('\n').filter(Boolean).reduce((a,r)=>{
    return a + scores[r.split(' ').join('')];
},0);
console.log('first half:',tally1);


const results = { X:['lose',0], Y:['draw',3], Z:['win',6] };
const matchup = {
    A: {win:'B',lose:'C',draw:'A'},   // rock
    B: {win:'C',lose:'A',draw:'B'},   // paper
    C: {win:'A',lose:'B',draw:'C'},   // scissors
}
const worth = { A:1, B:2, C:3 };


// second half
const tally2 = text.split('\n').filter(Boolean).reduce((a,r)=>{
    const [elf,rCode] = r.split(' ');
    const [result,matchScore] = results[rCode];
    console.log(elf,rCode,result, matchScore, matchup[elf][result]);
    const shapeScore = worth[matchup[elf][result]];

    return a + matchScore + shapeScore;
},0);

console.log('second half:',tally2);
