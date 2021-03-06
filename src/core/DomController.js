export default class DomController {
  constructor(options = {}) {
    this.rootNode = document.querySelector(options.root);
    this.game = options.game;
    this._locked = false;
  }

  init() {
    const size = this.game.getFieldSize();
    this.createTable(size, size);
  }

  createTable(rows = 0, cols = 0) {
    const child = document.createElement('table');
    this.rootNode.appendChild(child);

    const table = this.rootNode.querySelector('table');

    for (let i = 0; i < rows; i++) {
      const row = table.insertRow(i);

      for (let j = 0; j < cols; j++) {
        const cell = row.insertCell(j);

        cell.addEventListener('click', this._handleCellClick.bind(this, i, j));
      }
    }
  }

  _handleCellClick(row, col) {
    if (this._locked) {
      return;
    }

    this.lastClickedIndices = [row, col];

    try {
      this._makeUserMove(row, col);

      const continues = this._checkContinue();

      if (!continues) return;

      this._makeAIMove();

      this._checkContinue();
    } catch (e) {
      window.alert(e.message);
    }
  }

  _makeUserMove(row, col) {
    this.game.makeUserMove(row, col);
    this._redraw();
  }

  _makeAIMove() {
    this.game.makeAIMove();
    this._redraw();
  }

  _redraw() {
    const board = this.game.getState();
    const table = this.rootNode.querySelector('table');

    board.forEach((row, i) => {
      row.forEach((col, j) => {
        table.querySelector(
          `tr:nth-child(${i + 1}) td:nth-child(${j + 1})`
        ).innerHTML = col;
      });
    });
  }

  _checkContinue() {
    const state = this.game.checkGame();

    if (state !== 'continue') {
      const status = this._createNode('div', {
        text: state,
        id: 'status',
      });

      this.rootNode.appendChild(status);

      this._startNewGameTimer();

      return false;
    }

    return true;
  }

  _clear() {
    const statusEl = document.querySelector('#status');
    if (statusEl) {
      statusEl.remove();
    }
  }

  _startNewGameTimer() {
    this._locked = true;
    setTimeout(() => {
      this._clear();
      this.game._clear();
      this._redraw();
      this._locked = false;
    }, 3000);
  }

  _createNode(tag, config = {}) {
    const { text, id } = config;
    const node = document.createElement(tag);
    const txt = document.createTextNode(text);
    node.appendChild(txt);

    if (!!id) node.id = id;
    return node;
  }
}
