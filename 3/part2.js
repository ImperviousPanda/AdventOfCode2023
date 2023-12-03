const fs = require('fs');

const main = async () => {
  const input = String(await fs.readFileSync('./input1.txt'));
  const lines = input.split('\n');

  const coordinates = [];
  let y = 0;
  for (const line of lines) {
    coordinates[y] = getCoordinates(line);
    y++;
  }

  let sum = 0;

  for (let y = 0 ; y < coordinates.length; y++) {
    for (let x = 0; x < coordinates[y].length; x++) {
      const item = coordinates[y][x];
      if (item.symbol && item.symbol === '*') {
        const adjacentNumbers = getAdjacentNumbers(coordinates, item, x, y);

        if (adjacentNumbers.length === 2) {
          console.log(adjacentNumbers.map(n => n.number).sort().join(" * "));
          sum += adjacentNumbers[0].number * adjacentNumbers[1].number;
        }
      }
    }
  }

  console.log(sum);

}

const getAdjacentNumbers = (coordinates, item, x, y) => {
  const adjacentNumbers = [];
  const loc = item.start;

  adjacentNumbers.push(...getNumbersInAdjacentRow(coordinates[y - 1], loc));
  // Get numbers before or after this one in the row
  adjacentNumbers.push(...getRowAdjacentNumbers(coordinates[y], x, item.end));
  adjacentNumbers.push(...getNumbersInAdjacentRow(coordinates[y + 1], loc));

  return adjacentNumbers;
}

const getNumbersInAdjacentRow = (rowOfCoordinates, loc) => {
  const numbers = [];
  const locStart = loc - 1;
  const locEnd = loc + 1;
  for (const item of rowOfCoordinates) {
    if (item.number === undefined) continue;

    // if any of the characters fall into the position of loc - 1, loc and loc + 1
    // add to the list
    // (StartA <= EndB) and (EndA >= StartB)
    if (item.start <= locEnd && item.end >= locStart) {
      numbers.push(item);
    }
  }

  return numbers;
}

const getRowAdjacentNumbers = (rowOfCoordinates, indexInCoords, x) => {
  const numbers = [];
  const itemX = x.start;

  // Look at the one before
  if (indexInCoords > 0 && x > 0 &&
    x - 1 === rowOfCoordinates[indexInCoords - 1].end &&
    rowOfCoordinates[indexInCoords - 1].number !== undefined) {
    numbers.push(rowOfCoordinates[indexInCoords - 1])
  }

  // Look at the one after
  if (indexInCoords < rowOfCoordinates.length - 1 &&
    x + 1 === rowOfCoordinates[indexInCoords + 1].start &&
    rowOfCoordinates[indexInCoords + 1].number !== undefined) {
    numbers.push(rowOfCoordinates[indexInCoords + 1]);
  }

  return numbers;
}

const getCoordinates = (line) => {
  const items = [];
  let i = 0;
  let inNumber = false;
  let numStart;
  while (i < line.length) {
    const char = line[i];

    // The end of a one or more character number
    if (isNaN(char)) {
      if (inNumber) {
        items.push({
          start: numStart,
          end: i - 1,
          number: Number(line.substring(numStart, i))
        });
        inNumber = false;
        numStart = null;
      }
      if (char !== '.') {
        items.push({
          start: i,
          end: i,
          symbol: line[i]
        });
      }
    } else if (!isNaN(line[i])) {
      if (!inNumber) {
        numStart = i;
        inNumber = true;
      }
    }

    if (i === line.length - 1 && inNumber) {
      items.push({
        start: numStart,
        end: i,
        number: Number(line.substring(numStart, i + 1))
      });
      inNumber = false;
      numStart = null;
    }

    i++;
  }

  return items;


}

main();