const fs = require('fs');

const joinNumbers = (list) => {
  let string = '';
  for (const item of list) {
    switch (item[1]) {
      case 'one':
        string += '1';
        break;
      case 'two':
        string += '2';
        break;
      case 'three':
        string += '3';
        break;
      case 'four':
        string += '4';
        break;
      case 'five':
        string += '5';
        break;
      case 'six':
        string += '6';
        break;
      case 'seven':
        string += '7';
        break;
      case 'eight':
        string += '8';
        break;
      case 'nine':
        string += '9';
        break;
      default:
        string += String(item[1]);
    }
  }
  return string;
}

const main = async () => {
  const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;
  const input = await fs.readFileSync('./part1.txt');

  const lines = String(input).split('\n');

  let sum = 0;
  for (const line of lines) {
    if (!line) {
      continue;
    }
    const groups = [...line.matchAll(regex)];

    const string = joinNumbers(groups);

    const add = Number(string.substr(0, 1) + string.substr(-1))

    sum = sum + add;
  }
  console.log('sum : ', sum);

}

main();
