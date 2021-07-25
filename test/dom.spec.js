import { expect } from 'chai';
import jsdom from 'jsdom';

import Game from '../src/core/Game';
import DomController from '../src/core/DomController';

const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body id="root"></body></html>');

global.window = dom.window;
global.document = dom.window.document;

const createInstance = () => new DomController('#root');

describe('DOM controller', () => {
  it('Creates empty table', () => {
    const domController = createInstance();

    domController.createTable();

    expect(document.querySelectorAll('table').length).to.equal(1);
  });
});
