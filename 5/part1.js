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

  const seedMap = {};
  for (const seed of seeds) {
    seedMap[seed] = findLocation(seed, maps);
  }

  let lowest = null;
  let lowestSeed;
  for (const key of Object.keys(seedMap)) {
    if (lowest === null) {
      lowest = seedMap[key];
      lowestSeed = key;
    } else if (seedMap[key] < lowest) {
      lowest = seedMap[key];
      lowestSeed = key;
    }
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
      const startRange = item.source;
      const endRange = item.source + item.range - 1;
      if (currentIndex >= startRange && currentIndex <= endRange) {
        currentIndex += item.destination - item.source;
        break;
      }
    }
    currentType = mapTo.to;
    console.log(currentType, currentIndex);
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
      destination: Number(nums[0]),
      source: Number(nums[1]),
      range: Number(nums[2]),
    })
  }

  maps[nameParts[0]] = {
    numbers: items,
    to: nameParts[2]
  };
}

main();