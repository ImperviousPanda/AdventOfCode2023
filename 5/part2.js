const fs = require('fs');

const main = async () => {
  const input = fs.readFileSync('./input.txt').toString()

  const sections = input.split('\n\n');

  const maps = {};

  for (const section of sections.slice(1)) {
    parseSection(section, maps);
  }

  const seeds = sections[0].split(': ')[1].trim()
    .split(' ').filter(str => str !== '');

  let index = 0;
  let lowest = null;
  let lowestSeed;
  for (let i = 0; i < seeds.length - 1; i += 2) {
    for (let j = 0; j < Number(seeds[i+1]); j++) {
      const seed = Number(seeds[i]) + j;
      const location = findLocation(seed, maps);

      if (lowest === null) {
        lowest = location;
        lowestSeed = seed;
      } else if (location < lowest) {
        lowest = location;
        lowestSeed = seed;
      }

      index++;
    }
    console.log("FINISHED A SEED lowest seed :", lowestSeed, "location: ", lowest);
  }

  console.log("lowest seed :", lowestSeed, "location: ", lowest);
}

const findLocation = (seed, maps) => {
  let currentType = 'seed';
  let currentIndex = Number(seed);

  while (currentType !== 'location') {
    const mapTo = maps[currentType];

    for (const item of mapTo.numbers) {
      // check if currentIndex is in one of the ranges
      // if so, map to that one
      if (currentIndex >= item.startRange && currentIndex <= item.endRange) {
        currentIndex += item.addDifference;
        break;
      }
    }
    currentType = mapTo.to;
  }

  return currentIndex;
}

const parseSection = (section, maps) => {
  const items = [];
  const name = section.split(':\n')[0].split(' ')[0].trim();
  const nameParts = name.split('-');

  const numbers = section.split(':\n')[1].split('\n');

  for (const number of numbers) {
    const nums = number.trim().split(' ').filter(str => str !== '');
    items.push({
      startRange: Number(nums[1]),
      endRange: Number(nums[1]) + Number(nums[2]) - 1,
      addDifference: Number(nums[0]) - Number(nums[1])
    })
  }

  maps[nameParts[0]] = {
    numbers: items,
    to: nameParts[2]
  };
}

main();