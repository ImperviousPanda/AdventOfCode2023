const fs = require('fs');

const main = async () => {
  const input = String(await fs.readFileSync('./input1.txt'));

  const lines = input.split('\n');

  // By default there's one of each card
  const cardMap = {};
  for (let i = 0; i < lines.length; i++) {
    cardMap[i] = {
      num: 1,
      done: false
    }
  }

  while (notDone(cardMap)) {
    const nextNotDoneKey = Number(getNextNotDoneKey(cardMap));
    const numberIntersecting = getNumWinning(lines[nextNotDoneKey]);

    for (let i = nextNotDoneKey + 1; i < nextNotDoneKey + numberIntersecting + 1; i++) {
      cardMap[i].num += cardMap[nextNotDoneKey].num;
    }

    cardMap[nextNotDoneKey].done = true;
  }

  let sum = 0;
  for (const key of Object.keys(cardMap)) {
    sum += cardMap[key].num;
  }

  console.log(sum)
}

const getNumWinning = (line) => {
  const numbers = getNumbersFromLine(line);
  let intersecting = 0;
  for (const num of numbers.cardNumbers) {
    if (numbers.winning.has(num)) intersecting++;
  }

  return intersecting;
}

const getNumbersFromLine = (line) => {
  const groups = line.split(': ')[1].split(' | ');

  const winningNumbers = new Set(groups[0].trim().split(' ')
  .filter(str => str !== ''));
  const haveNumbers = groups[1].trim().split(' ')
  .filter(str => str !== '');

  return {
    winning: winningNumbers, cardNumbers: haveNumbers
  };
}

const getNextNotDoneKey = (cardMap) => {
  for (const key of Object.keys(cardMap)) {
    if (!cardMap[key].done) return key;
  }
  return true;
}

const notDone = (cardMap) => {
  for (const key of Object.keys(cardMap)) {
    if (!cardMap[key].done) return true;
  }
  return false;
}

main();