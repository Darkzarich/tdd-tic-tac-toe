import './styles/main.css';

import DomController from './core/DomController';
import Game from './core/Game';

const game = new Game();
const dom = new DomController({
  root: 'body',
  game,
});

dom.init();
