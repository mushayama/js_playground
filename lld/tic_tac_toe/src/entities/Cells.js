"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cells = void 0;
const Enums_1 = require("./Enums");
class Cells {
    constructor() {
        this.symbol = Enums_1.Symbol.X;
    }
    getSymbol() {
        return this.symbol ? Enums_1.Symbol[this.symbol].toString() : ".";
    }
}
exports.Cells = Cells;
