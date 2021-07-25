import { expect } from 'chai';
import Game from '../src/core/Game';

const userName = 'User';
const aiName = 'Computer';
const userMoveSymbol = 'X';
const AIMoveSymbol = 'O';
const initialGameBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let game;

beforeEach(() => {
  game = new Game();
});

describe('Game', () => {
  it('Should return empty game board', () => {
    const board = game.getState();

    expect(board).to.deep.equal(initialGameBoard);
  });

  it("Places user's symbol in the given coords", () => {
    const x = 1,
      y = 1;

    game.makeUserMove(x, y);

    const board = game.getState();

    expect(board[x][y]).to.equal(userMoveSymbol);
  });

  it('Throws an exception if user moves in a taken cell', () => {
    const x = 1,
      y = 1;

    game.makeUserMove(x, y);

    const func = game.makeUserMove.bind(game, x, y);

    expect(func).to.throw('cell is already taken');
  });

  it('Makes AI move in the given coords', () => {
    const x = 1,
      y = 1;

    game.makeAIMove(x, y);

    const board = game.getState();

    expect(board[x][y]).to.equal(AIMoveSymbol);
  });

  it("Game saves user's move in history", () => {
    const x = 1,
      y = 1;

    game.makeUserMove(x, y);

    const history = game.getMoveHistory();

    expect(history).to.deep.equal([{ turn: userName, x, y }]);
  });

  it("Game saves computers's move in history", () => {
    const x = 1,
      y = 1;

    game.makeAIMove(x, y);

    const history = game.getMoveHistory();

    expect(history).to.deep.equal([{ turn: aiName, x, y }]);
  });

  it('Game saves long move history', () => {
    game.makeAIMove(0, 0);
    game.makeUserMove(0, 1);
    game.makeAIMove(1, 1);
    game.makeUserMove(0, 2);

    const history = game.getMoveHistory();

    expect(history.length).to.equal(4);

    expect(history).to.deep.equal([
      { turn: aiName, x: 0, y: 0 },
      { turn: userName, x: 0, y: 1 },
      { turn: aiName, x: 1, y: 1 },
      { turn: userName, x: 0, y: 2 },
    ]);
  });
});
