export default class DomController {
  constructor(options = {}) {
    this.rootNode = document.querySelector(options.root);
    this.game = options.game;
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
    this.lastClickedIndices = [row, col];
    try {
      this._makeUserMove(row, col);
    } catch (e) {
      window.alert(e);
    }
  }

  _makeUserMove(row, col) {
    this.game.makeUserMove(row, col);
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
}
