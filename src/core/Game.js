export default class Game {
  constructor() {
    this._fieldSize = 3;
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

  makeAIMove() {
    if (this._getFreeCellsCount() === 0) {
      return this._throwException('no cells available');
    }

    const [x, y] = this._getFreeRandomCoordinates();

    this._updateHistory(x, y, this._computerName);
    this._updateBoard(x, y, this._AIMoveSymbol);
  }

  getMoveHistory() {
    return this._history;
  }

  _getFreeRandomCoordinates() {
    let x = this._getRandomCoords();
    let y = this._getRandomCoords();

    while (!!this._board[x][y]) {
      x = this._getRandomCoords();
      y = this._getRandomCoords();
    }

    return [x, y];
  }

  _getFreeCellsCount() {
    return this._board.reduce(
      (total, row) =>
        row.reduce((count, el) => (el === '' ? ++count : count), total),
      0
    );
  }

  _updateHistory(x, y, name) {
    this._history.push({ turn: name, x, y });
  }

  _getRandomCoords() {
    return Math.floor(Math.random() * this._fieldSize);
  }

  _throwException(msg) {
    throw new Error(msg);
  }
}
