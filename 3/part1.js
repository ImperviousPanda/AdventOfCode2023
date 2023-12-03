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

  const numbers = getAdjacentNumbers(coordinates);

  console.log(numbers[numbers.length - 1]);
  console.log(numbers.reduce((a, b) => a + b));

}

const getAdjacentNumbers = (coordinates) => {
  const adjacentNumbers = [];
  for (let y = 0; y < coordinates.length; y++) {
    for (let x = 0; x < coordinates[y].length; x++) {
      if (coordinates[y][x].number != null) {
        const numberItem = coordinates[y][x];
        const startIndex = numberItem.start;
        const endIndex = numberItem.end;
        // then Y is the y index

        // check for adjacent symbols in the row above
        if (y > 0 && isInAdjacentRow(coordinates[y - 1], startIndex, endIndex)) {
          adjacentNumbers.push(coordinates[y][x].number);
          continue;
        }

        // check for symbols before or after this one in this row
        if (isRowAdjacentChar(coordinates[y], x)) {
          adjacentNumbers.push(coordinates[y][x].number);
          continue;
        }

        //check for adjacent symbols in the row below
        if (y < coordinates.length - 1 &&
          isInAdjacentRow(coordinates[y + 1], startIndex, endIndex)) {
          adjacentNumbers.push(coordinates[y][x].number);
          continue;
        }
      }
    }
  }

  return adjacentNumbers;
}

const isInAdjacentRow = (rowOfCoordinates, startIndex, endIndex) => {
  for (const item of rowOfCoordinates) {
    if (item.number !== undefined) continue;

    // symbols are one character, so start == end
    // start needs to be in range of
    // startIndex - 1 <= start <= endIndex + 1
    if (startIndex - 1 <= item.start && item.start <= endIndex + 1) {
      return true;
    }
  }
  return false;
}

const isRowAdjacentChar = (rowOfCoordinates, x) => {
  const number = rowOfCoordinates[x];
  if (x > 0 && rowOfCoordinates[x - 1] &&
    number.start === rowOfCoordinates[x - 1].start + 1) {
      return true;
  }

  if (x < rowOfCoordinates.length - 1 &&
    number.end + 1 === rowOfCoordinates[x + 1].start) {
    return true;
  }

  return false;
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