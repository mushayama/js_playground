"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
const Constants_1 = require("./Constants");
class Cell {
    constructor() {
        this.character = Constants_1.PLACEHOLDER_CHAR;
    }
    setCharacter(character) {
        this.character = character;
    }
    getCharacter() {
        return this.character;
    }
}
exports.Cell = Cell;
