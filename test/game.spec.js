import { expect } from 'chai';
import sinon from 'sinon';
import Game from '../src/core/Game';
import GameBuilder from './classes/GameBuilder';

const userName = 'User';
const aiName = 'Computer';
const userMoveSymbol = 'X';
const AIMoveSymbol = 'O';
const initialGameBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const fillCells = (game, config = {}) => {
  const { x = -1, y = -1 } = config;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i !== x || j !== y) game.makeUserMove(i, j);
    }
  }
};

const count = (arr, symbol) =>
  arr.reduce((result, row) => {
    return row.reduce((count, el) => {
      return el === symbol ? ++count : count;
    }, result);
  }, 0);

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

  it("Game saves user's move in history", () => {
    const x = 1,
      y = 1;

    game.makeUserMove(x, y);

    const history = game.getMoveHistory();

    expect(history).to.deep.equal([{ turn: userName, x, y }]);
  });

  it("Game saves computers's move in history", () => {
    const stub = sinon.stub(Math, 'random').returns(0.5);

    game.makeAIMove();

    const history = game.getMoveHistory();

    expect(history).to.deep.equal([{ turn: aiName, x: 1, y: 1 }]);

    stub.restore();
  });

  it('Game saves long move history', () => {
    let stub = sinon.stub(Math, 'random').returns(0);

    game.makeAIMove(0, 0);

    stub.restore();

    game.makeUserMove(0, 1);

    const history = game.getMoveHistory();

    expect(history.length).to.equal(2);

    expect(history).to.deep.equal([
      { turn: aiName, x: 0, y: 0 },
      { turn: userName, x: 0, y: 1 },
    ]);
  });

  it('Computer moves in randomly chosen cell', () => {
    const stub = sinon.stub(Math, 'random').returns(0.5);

    game.makeAIMove();

    const board = game.getState();

    expect(board[1][1]).to.equal(AIMoveSymbol);

    stub.restore();
  });

  it('Computer moves in cell that is not taken', () => {
    // fill all the cells with user's symbol except the last
    fillCells(game, { x: 2, y: 2 });

    game.makeAIMove();

    const board = game.getState();

    const userCount = count(board, userMoveSymbol);

    const aiCount = count(board, AIMoveSymbol);

    expect(userCount).to.equal(8);
    expect(aiCount).to.equal(1);
    expect(board[2][2]).to.equal(AIMoveSymbol);
  });

  it('If there are no free cells computer throws an exception', () => {
    // fill all the cells
    fillCells(game);

    const func = game.makeAIMove.bind(game);

    expect(func).to.throw('no cells available');
  });

  it('Checks if user won by horizontal combination', () => {
    const game = new GameBuilder()
      .withBoardState(
        `
      X X X
      . . .
      . . .`
      )
      .build();

    const userWon = game.isWinner(userName);

    expect(userWon).to.be.true;
  });

  it('Checks if user won by vertical combination', () => {
    const game = new GameBuilder()
      .withBoardState(
        `
      X . .
      X . .
      X . .`
      )
      .build();

    const userWon = game.isWinner(userName);

    expect(userWon).to.be.true;
  });

  it('Checks if user won by diagonal combination', () => {
    const game = new GameBuilder()
      .withBoardState(
        `
      X . .
      . X .
      . . X`
      )
      .build();

    const userWon = game.isWinner(userName);

    expect(userWon).to.be.true;
  });
});
