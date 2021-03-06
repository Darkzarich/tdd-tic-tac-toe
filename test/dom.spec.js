import { expect } from 'chai';
import jsdom from 'jsdom';
import sinon from 'sinon';

import Game from '../src/core/Game';
import GameBuilder from './classes/GameBuilder';
import DomController from '../src/core/DomController';

const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body id="root"></body></html>');

global.window = dom.window;
global.document = dom.window.document;

const createInstance = (game = {}) => {
  return new DomController({
    game: game,
    root: '#root',
  });
};

describe('DOM controller', () => {
  beforeEach(() => {
    window.alert = sinon.spy();
    window.confirm = sinon.spy();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('Creates empty table', () => {
    const domController = createInstance();

    domController.createTable();

    expect(document.querySelectorAll('table').length).to.equal(1);
  });

  it('Creates table with 3 rows and 3 columns', () => {
    const domController = createInstance();

    domController.createTable(3, 3);

    expect(document.querySelectorAll('table').length).to.equal(1);
    expect(document.querySelectorAll('tr').length).to.equal(3);
    expect(document.querySelectorAll('td').length).to.equal(9);
  });

  it('Remembers indices of last clicked cell', () => {
    const domController = createInstance();

    domController.createTable(3, 3);
    document.querySelector('table td').click();

    expect(domController.lastClickedIndices).to.deep.equal([0, 0]);
  });

  it('Makes user move in game on cell click', () => {
    const gameMock = { makeUserMove: sinon.spy() };
    const domController = createInstance(gameMock);

    domController.createTable(3, 3);

    document.querySelector('table td').click();

    expect(domController.game.makeUserMove.called).to.be.true;
  });

  it('Gets an alert when user makes move in taken cell', () => {
    const game = new Game();
    const domController = createInstance(game);

    domController.init();

    document.querySelector('table td').click();
    document.querySelector('table td').click();

    expect(window.alert.called).to.be.true;
  });

  it('Redraws table on cell click', () => {
    const game = new Game();
    const domController = createInstance(game);

    domController.init();

    document.querySelector('table td').click();

    const text = document.querySelector('table td').textContent;

    expect(text).to.be.equal('X');
  });

  it('Makes computer move right after users move', () => {
    const game = new Game();
    const domController = createInstance(game);

    domController.init();

    document.querySelector('table td').click();

    const text = document.querySelector('table').textContent;

    expect(text.indexOf('O') > -1).to.be.true;
  });

  it('Creates status text below table if someone wins', () => {
    const game = new GameBuilder()
      .withBoardState(
        `
      X . O
      X O .
      . . .`
      )
      .build();

    const domController = createInstance(game);

    domController.init();

    document.querySelector('table tr:nth-child(3) td:nth-child(1)').click();

    const status = document.querySelector('#status');

    expect(status.textContent).to.equal('User won!');
  });
});
