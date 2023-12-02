const fs = require('fs');

const limits = {
  'blue': 14,
  'red': 12,
  'green': 13
}

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


    let valid = true;
    for (const set of sets) {
      const rounds = set.split(', ');
      for (const round of rounds) {
        const [num, color] = round.split(' ');
        if (num > limits[color]) {
          valid = false;
          break;
        }
      }
    }

    if (valid) {
      sum += Number(gameNum);
    }

  }
  console.log("sum ", sum);
}

main();