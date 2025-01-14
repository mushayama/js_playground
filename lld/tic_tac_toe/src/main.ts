import { Game } from "./entities/Game";
import * as rl from "readline-sync";

const gameBuilder = new Game.Builder();

var noOfPlayers = Number(rl.question("Enter number of players: "));
for (let i = 0; i < noOfPlayers; i++) {
  const playerName = rl.question(`Enter Player ${i + 1} name: `);
  const playerChar = rl.question(`Enter Player ${i + 1} char: `);
  gameBuilder.addPlayer(playerName, playerChar);
}

const game = gameBuilder.build();

while (game.getState() == "STARTED") {
  console.log(game.nextTurnPrompt());
  const box = rl.question("Enter box: ");
  game.play(box);
}

process.exit(0);
