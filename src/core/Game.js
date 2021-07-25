export default class Game {
  constructor() {
    this._userName = 'User';
    this._computerName = 'Computer';
    this._userMoveSymbol = 'X';
    this._AIMoveSymbol = 'O';
    this._history = [];
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
    this._updateHistory(x, y, this._userName);
    this._updateBoard(x, y, this._userMoveSymbol);
  }

  makeAIMove(x, y) {
    this._updateHistory(x, y, this._computerName);
    this._updateBoard(x, y, this._AIMoveSymbol);
  }

  getMoveHistory() {
    return this._history;
  }

  _updateHistory(x, y, name) {
    this._history.push({ turn: name, x, y });
  }

  _throwException(msg) {
    throw new Error(msg);
  }
}
