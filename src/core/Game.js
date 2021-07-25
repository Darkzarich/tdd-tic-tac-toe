export default class Game {
  constructor() {
    this._userMoveSymbol = 'X';
    this._AIMoveSymbol = 'O';
    this._board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  }

  _updateBoard(x, y, symbol) {
    if (!this._isEmpty(x, y)) {
      this._throwException('cell is already taken');
    }

    this._board[x][y] = symbol;
  }

  _isEmpty(x, y) {
    return !this._board[x][y];
  }

  getState() {
    return this._board;
  }

  makeUserMove(x, y) {
    this._updateBoard(x, y, this._userMoveSymbol);
  }

  makeAIMove(x, y) {
    this._updateBoard(x, y, this._AIMoveSymbol);
  }

  _throwException(msg) {
    throw new Error(msg);
  }
}
