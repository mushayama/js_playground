import { Board } from "./Board";
import {
  DEFAULT_BOARD_SIZE,
  MIN_BOARD_SIZE,
  MIN_PLAYERS,
  VICTORY_STREAK,
} from "./Constants";
import { Player } from "./Player";

type GAME_STATE = "STARTED" | "END_WINNER" | "END_DRAW";

export class Game {
  private players: Player[];
  private board: Board;
  private maxTurns: number;
  private turn = 0;
  private state: GAME_STATE = "STARTED";

  static Builder = class GameBuilder {
    private players: Player[] = [];
    private boardSize: number = DEFAULT_BOARD_SIZE;

    addPlayer(name: string, character: string): GameBuilder {
      if (
        this.players.reduce(
          (sum, next) => sum || next.getCharacter() == character,
          false
        )
      ) {
        throw new Error(`Character ${character} is already taken`);
      }
      this.players.push(
        new Player.Builder().setName(name).setCharacter(character).build()
      );
      return this;
    }

    setBoardSize(boardSize: number): GameBuilder {
      if (boardSize < MIN_BOARD_SIZE)
        throw new Error(`Board size cannot be less than ${MIN_BOARD_SIZE}`);
      this.boardSize = boardSize;
      return this;
    }

    build(): Game {
      if (this.players.length < MIN_PLAYERS)
        throw new Error(`Create at least ${MIN_PLAYERS} players first`);
      return new Game(
        this.players,
        new Board(this.boardSize),
        this.boardSize ** 2
      );
    }
  };

  private constructor(players: Player[], board: Board, maxTurns: number) {
    this.players = players;
    this.board = board;
    this.maxTurns = maxTurns;
  }

  private checkWinner(box: string, character: string): boolean {
    return this.board.checkWinner(box, character, VICTORY_STREAK);
  }

  nextTurnPrompt(): string {
    const player = this.players[this.turn % this.players.length];
    return `Turn: ${
      this.turn + 1
    }  |  Player: ${player.getName()} (${player.getCharacter()}): `;
  }

  play(box: string): void {
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

  getState(): GAME_STATE {
    return this.state;
  }
}
