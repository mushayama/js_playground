import { Cell } from "./Cell";
import { DEFAULT_BOARD_SIZE, PLACEHOLDER_CHAR } from "./Constants";

export class Board {
  private gridSize: number;
  private grid: Cell[][];

  constructor(gridSize: number = DEFAULT_BOARD_SIZE) {
    this.gridSize = gridSize;
    this.grid = [];
    for (let i = 0; i < gridSize; i++) {
      this.grid[i] = [];
      for (let j = 0; j < gridSize; j++) {
        this.grid[i][j] = new Cell();
      }
    }
  }

  printBoard(): void {
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        process.stdout.write(this.grid[i][j].getCharacter() + " ");
      }
      process.stdout.write("\n");
    }
  }

  markBoard(box: string, character: string): boolean {
    const [row, column] = this.getRowAndColumn(box);
    if (this.grid[row][column].getCharacter() != PLACEHOLDER_CHAR) {
      return false;
    }
    this.grid[row][column].setCharacter(character);
    return true;
  }

  checkWinner(box: string, character: string, victoryStreak: number): boolean {
    const [row, column] = this.getRowAndColumn(box);
    if (
      this.checkDirection(row, column, character, victoryStreak, 1, 0) ||
      this.checkDirection(row, column, character, victoryStreak, 0, 1) ||
      this.checkDirection(row, column, character, victoryStreak, 1, 1) ||
      this.checkDirection(row, column, character, victoryStreak, 1, -1)
    ) {
      return true;
    }
    return false;
  }

  checkDirection(
    row: number,
    column: number,
    character: string,
    victoryStreak: number,
    rowShift: number,
    colShift: number
  ): boolean {
    let i = row + rowShift,
      j = column + colShift,
      streak = 1;
    while (
      i >= 0 &&
      i < this.gridSize &&
      j >= 0 &&
      j < this.gridSize &&
      this.grid[i][j].getCharacter() == character &&
      streak < victoryStreak
    ) {
      streak++;
      i += rowShift;
      j += colShift;
    }
    if (streak >= victoryStreak) return true;
    i = row - rowShift;
    j = column - colShift;
    while (
      i >= 0 &&
      i < this.gridSize &&
      j >= 0 &&
      j < this.gridSize &&
      this.grid[i][j].getCharacter() == character &&
      streak < victoryStreak
    ) {
      streak++;
      i -= rowShift;
      j -= colShift;
    }
    if (streak >= victoryStreak) return true;
    return false;
  }

  getRowAndColumn(box: string): [number, number] {
    const [row, column] = box.split(" ").map((x) => Number(x));
    if (row > this.gridSize || row <= 0) {
      throw new Error(
        `row must lie between 1 and ${this.gridSize}, both inclusive`
      );
    }
    if (column > this.gridSize || column <= 0) {
      throw new Error(
        `column must lie between 1 and ${this.gridSize}, both inclusive`
      );
    }
    return [row - 1, column - 1];
  }
}
