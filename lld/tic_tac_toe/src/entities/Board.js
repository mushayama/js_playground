"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const Cell_1 = require("./Cell");
const Constants_1 = require("./Constants");
class Board {
    constructor(gridSize = Constants_1.DEFAULT_BOARD_SIZE) {
        this.gridSize = gridSize;
        this.grid = [];
        for (let i = 0; i < gridSize; i++) {
            this.grid[i] = [];
            for (let j = 0; j < gridSize; j++) {
                this.grid[i][j] = new Cell_1.Cell();
            }
        }
    }
    printBoard() {
        console.log("Hello");
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                process.stdout.write(this.grid[i][j].getCharacter() + " ");
            }
            process.stdout.write("\n");
        }
    }
    markBoard(box, character) {
        const [row, column] = this.getRowAndColumn(box);
        if (this.grid[row][column].getCharacter() != Constants_1.PLACEHOLDER_CHAR) {
            console.log("inavlid");
            return false;
        }
        this.grid[row][column].setCharacter(character);
        return true;
    }
    checkWinner(box, character, victoryStreak) {
        const [row, column] = this.getRowAndColumn(box);
        if (this.checkDirection(row, column, character, victoryStreak, 1, 0) ||
            this.checkDirection(row, column, character, victoryStreak, 0, 1) ||
            this.checkDirection(row, column, character, victoryStreak, 1, 1) ||
            this.checkDirection(row, column, character, victoryStreak, 1, -1)) {
            return true;
        }
        return false;
    }
    checkDirection(row, column, character, victoryStreak, rowShift, colShift) {
        let i = row + rowShift, j = column + colShift, streak = 1;
        while (i >= 0 &&
            i < this.gridSize &&
            j >= 0 &&
            j < this.gridSize &&
            this.grid[i][j].getCharacter() == character &&
            streak < victoryStreak) {
            streak++;
            i += rowShift;
            j += colShift;
        }
        if (streak >= victoryStreak)
            return true;
        i = row - rowShift;
        j = column - colShift;
        while (i >= 0 &&
            i < this.gridSize &&
            j >= 0 &&
            j < this.gridSize &&
            this.grid[i][j].getCharacter() == character &&
            streak < victoryStreak) {
            streak++;
            i -= rowShift;
            j -= colShift;
        }
        if (streak >= victoryStreak)
            return true;
        return false;
    }
    getRowAndColumn(box) {
        const [row, column] = box.split(" ").map((x) => Number(x));
        if (row > this.gridSize || row <= 0) {
            throw new Error(`row must lie between 1 and ${this.gridSize}, both inclusive`);
        }
        if (column > this.gridSize || column <= 0) {
            throw new Error(`column must lie between 1 and ${this.gridSize}, both inclusive`);
        }
        return [row - 1, column - 1];
    }
}
exports.Board = Board;
