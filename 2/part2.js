const fs = require('fs');

const main = async () => {
  const input = String(await fs.readFileSync('./input1.txt'));
  const lines = input.split('\n');

  let sum = 0;
  for (const line of lines) {
    if (!line) {
      continue;
    }

    const gameNum = line.split(': ')[0].split(' ')[1];
    const sets = line.split(': ')[1].split('; ');

    const minColors = {};
    for (const set of sets) {
      const rounds = set.split(', ');
      for (const round of rounds) {
        const [num, color] = round.split(' ');
        const number = Number(num);

        if (!minColors[color]) {
          minColors[color] = number;
        } else if (num > minColors[color]) {
          minColors[color] = number;
        }
      }
    }

    sum += minColors['blue'] * minColors['red'] * minColors['green'];

  }
  console.log("sum ", sum);
}

main();