import { PLACEHOLDER_CHAR } from "./Constants";

export class Cell {
  private character: string;

  constructor() {
    this.character = PLACEHOLDER_CHAR;
  }

  setCharacter(character: string): void {
    this.character = character;
  }

  getCharacter(): string {
    return this.character;
  }
}
