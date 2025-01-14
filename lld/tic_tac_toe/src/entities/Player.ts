import { MAX_CHAR_LENGTH, PLACEHOLDER_CHAR } from "./Constants";

export class Player {
  private name: string;
  private character: string;

  static Builder = class PlayerBuilder {
    private name!: string;
    private character!: string;

    setName(value: string): PlayerBuilder {
      this.name = value;
      return this;
    }

    setCharacter(value: string): PlayerBuilder {
      if (value.length > MAX_CHAR_LENGTH)
        throw new Error(`Character cannot exceed length ${MAX_CHAR_LENGTH}`);
      if (value == PLACEHOLDER_CHAR)
        throw new Error(`Character cannot be ${PLACEHOLDER_CHAR}`);
      this.character = value;
      return this;
    }

    build(): Player {
      if (!this.name) throw new Error("Set name first");
      if (!this.character) throw new Error("Set character first");
      return new Player(this.name, this.character);
    }
  };

  private constructor(name: string, character: string) {
    this.name = name;
    this.character = character;
  }

  getName(): string {
    return this.name;
  }

  getCharacter(): string {
    return this.character;
  }
}
