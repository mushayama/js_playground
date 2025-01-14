"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const Constants_1 = require("./Constants");
class Player {
    constructor(name, character) {
        this.name = name;
        this.character = character;
    }
    getName() {
        return this.name;
    }
    getCharacter() {
        return this.character;
    }
}
exports.Player = Player;
Player.Builder = class PlayerBuilder {
    setName(value) {
        this.name = value;
        return this;
    }
    setCharacter(value) {
        if (value.length > Constants_1.MAX_CHAR_LENGTH)
            throw new Error(`Character cannot exceed length ${Constants_1.MAX_CHAR_LENGTH}`);
        if (value == Constants_1.PLACEHOLDER_CHAR)
            throw new Error(`Character cannot be ${Constants_1.PLACEHOLDER_CHAR}`);
        this.character = value;
        return this;
    }
    build() {
        if (!this.name)
            throw new Error("Set name first");
        if (!this.character)
            throw new Error("Set character first");
        return new Player(this.name, this.character);
    }
};
