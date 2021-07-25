import { AI_SYMBOL, INITIAL_BOARD, USER_SYMBOL } from './consts';

const shallowCopy = (obj) => JSON.parse(JSON.stringify(obj));
export default class Game {
  constructor() {
    this._fieldSize = 3;
    this._userName = 'User';
    this._computerName = 'Computer';
    this._userMoveSymbol = USER_SYMBOL;
    this._AIMoveSymbol = AI_SYMBOL;
    this._history = [];
    this._board = shallowCopy(INITIAL_BOARD);
  }

  _clear() {
    this._history = [];
    this._board = shallowCopy(INITIAL_BOARD);
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

  isWinner(player) {
    const symbol = this._getSymbolForPlayer(player);
    const isEqual = this._checkCellEqual(symbol);
    const rowNumbers = [...Array(this._fieldSize).keys()];

    const horizontal = rowNumbers.reduce((res, i) => {
      return (isEqual(i, 0) && isEqual(i, 1) && isEqual(i, 2)) || res;
    }, false);

    const vertical = rowNumbers.reduce((res, j) => {
      return (isEqual(0, j) && isEqual(1, j) && isEqual(2, j)) || res;
    }, false);

    const diagonal =
      (isEqual(0, 0) && isEqual(1, 1) && isEqual(2, 2)) ||
      (isEqual(0, 2) && isEqual(1, 1) && isEqual(2, 0));

    return horizontal || vertical || diagonal;
  }

  makeUserMove(x, y) {
    this._updateHistory(x, y, this._userName);
    this._updateBoard(x, y, this._userMoveSymbol);
  }

  makeAIMove() {
    if (this._getFreeCellsCount() === 0) {
      return this._throwException('no cells available');
    }

    const [x, y] = this._getFreeRandomCoords();

    this._updateHistory(x, y, this._computerName);
    this._updateBoard(x, y, this._AIMoveSymbol);
  }

  getMoveHistory() {
    return this._history;
  }

  getFieldSize() {
    return this._fieldSize;
  }

  checkGame() {
    if (this.isWinner(this._userName)) return `${this._userName} won!`;
    if (this.isWinner(this._computerName)) return `${this._computerName} won!`;
    if (this._getFreeCellsCount() === 0) return `nobody won :–(`;

    return 'continue';
  }

  _getFreeRandomCoords() {
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

  _getSymbolForPlayer(player) {
    return player === this._userName
      ? this._userMoveSymbol
      : this._computerMoveSymbol;
  }

  _checkCellEqual(symbol) {
    return (i, j) => this._board[i][j] === symbol;
  }
}
