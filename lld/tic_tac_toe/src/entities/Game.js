"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Board_1 = require("./Board");
const Constants_1 = require("./Constants");
const Player_1 = require("./Player");
class Game {
    constructor(players, board, maxTurns) {
        this.turn = 0;
        this.state = "STARTED";
        this.players = players;
        this.board = board;
        this.maxTurns = maxTurns;
    }
    checkWinner(box, character) {
        return this.board.checkWinner(box, character, Constants_1.VICTORY_STREAK);
    }
    nextTurnPrompt() {
        const player = this.players[this.turn % this.players.length];
        return `Turn: ${this.turn + 1}  |  Player: ${player.getName()} (${player.getCharacter()}): `;
    }
    play(box) {
        const player = this.players[this.turn % this.players.length];
        const success = this.board.markBoard(box, player.getCharacter());
        if (success) {
            this.board.printBoard();
            if (this.checkWinner(box, player.getCharacter())) {
                this.state = "END_WINNER";
                console.log(`Game Over: ${player.getName()} is the winner`);
                return;
            }
            this.turn++;
        }
        if (this.turn == this.maxTurns) {
            this.state = "END_DRAW";
            console.log("Game ended in a DRAW");
        }
    }
    getState() {
        return this.state;
    }
}
exports.Game = Game;
Game.Builder = class GameBuilder {
    constructor() {
        this.players = [];
        this.boardSize = Constants_1.DEFAULT_BOARD_SIZE;
    }
    addPlayer(name, character) {
        if (this.players.reduce((sum, next) => sum || next.getCharacter() == character, false)) {
            throw new Error(`Character ${character} is already taken`);
        }
        this.players.push(new Player_1.Player.Builder().setName(name).setCharacter(character).build());
        return this;
    }
    setBoardSize(boardSize) {
        if (boardSize < Constants_1.MIN_BOARD_SIZE)
            throw new Error(`Board size cannot be less than ${Constants_1.MIN_BOARD_SIZE}`);
        this.boardSize = boardSize;
        return this;
    }
    build() {
        if (this.players.length < Constants_1.MIN_PLAYERS)
            throw new Error(`Create at least ${Constants_1.MIN_PLAYERS} players first`);
        return new Game(this.players, new Board_1.Board(this.boardSize), this.boardSize ** 2);
    }
};
