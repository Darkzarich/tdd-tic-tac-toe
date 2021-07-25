import { expect } from 'chai';
import Game from '../src/core/Game';

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
});
