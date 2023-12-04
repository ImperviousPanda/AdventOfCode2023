const fs = require('fs');

const main = async () => {
  const input = String(await fs.readFileSync('./input1.txt'));

  const lines = input.split('\n');

  let sum = 0;
  for (const line of lines) {
    const groups = line.split(': ')[1].split(' | ');

    const winningNumbers = new Set(groups[0].trim().split(' ')
      .filter(str => str !== ''));
    const haveNumbers = groups[1].trim().split(' ');

    let cardSum = 0;
    for (const number of haveNumbers) {
      if (winningNumbers.has(number)) {
        if (cardSum === 0) {
          cardSum += 1;
        } else {
          cardSum = cardSum * 2;
        }
      }
    }

    console.log(line, cardSum);
    sum += cardSum;

  }

  console.log(sum);


}

main();