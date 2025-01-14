import { Board } from "../src/entities/Board";

test("board initialization works", function (assert) {
  const b = new Board();

  process.stdout.write = jest.fn();

  b.printBoard();

  const expectedOutput = [
    "- ",
    "- ",
    "- ",
    "\n",
    "- ",
    "- ",
    "- ",
    "\n",
    "- ",
    "- ",
    "- ",
    "\n",
  ];
  expectedOutput.forEach((line, index) => {
    expect(process.stdout.write).toHaveBeenCalledWith(line);
  });
  expect(process.stdout.write).toHaveBeenCalledTimes(12);

  assert();
});

test("board marking works", function (assert) {
  const b = new Board();
  const bool = b.markBoard("3 1", "Q");

  expect(bool).toBe(true);

  process.stdout.write = jest.fn();
  b.printBoard();

  const expectedOutput = [
    "- ",
    "- ",
    "- ",
    "\n",
    "- ",
    "- ",
    "- ",
    "\n",
    "Q ",
    "- ",
    "- ",
    "\n",
  ];
  expectedOutput.forEach((line, index) => {
    expect(process.stdout.write).toHaveBeenCalledWith(line);
  });

  assert();
});

test("board repeat marking throws error", function (assert) {
  const b = new Board();
  const attempt1 = b.markBoard("3 1", "Q");
  const attempt2 = b.markBoard("3 1", "Q");

  expect(attempt1).toBe(true);
  expect(attempt2).toBe(false);

  assert();
});

test("board box is invalid", function (assert) {
  const b = new Board();
  expect(() => {
    b.markBoard("4 3", "Q");
  }).toThrow("row must lie between 1 and 3, both inclusive");
  expect(() => {
    b.markBoard("3 4", "Q");
  }).toThrow("column must lie between 1 and 3, both inclusive");

  assert();
});

test("board can tell victory", function (assert) {
  const b = new Board();
  b.markBoard("1 3", "X");
  expect(b.checkWinner("1 3", "X", 3)).toBe(false);
  b.markBoard("1 2", "X");
  expect(b.checkWinner("1 2", "X", 3)).toBe(false);
  b.markBoard("1 1", "X");
  expect(b.checkWinner("1 1", "X", 3)).toBe(true);

  const b2 = new Board();
  b2.markBoard("1 1", "X");
  expect(b2.checkWinner("1 1", "X", 3)).toBe(false);
  b2.markBoard("2 1", "X");
  expect(b2.checkWinner("2 1", "X", 3)).toBe(false);
  b2.markBoard("3 1", "X");
  expect(b2.checkWinner("3 1", "X", 3)).toBe(true);

  const b3 = new Board();
  b3.markBoard("1 1", "X");
  expect(b3.checkWinner("1 1", "X", 3)).toBe(false);
  b3.markBoard("2 2", "X");
  expect(b3.checkWinner("2 2", "X", 3)).toBe(false);
  b3.markBoard("3 3", "X");
  expect(b3.checkWinner("3 3", "X", 3)).toBe(true);

  const b4 = new Board();
  b4.markBoard("1 3", "X");
  expect(b4.checkWinner("1 3", "X", 3)).toBe(false);
  b4.markBoard("2 2", "X");
  expect(b4.checkWinner("2 2", "X", 3)).toBe(false);
  b4.markBoard("3 1", "X");
  expect(b4.checkWinner("3 1", "X", 3)).toBe(true);

  assert();
});
