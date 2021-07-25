import Game from '../../src/core/Game';

// pattern Builder
class GameBuilder {
  constructor() {
    this.game = new Game();
  }

  withBoardState(state) {
    state = state
      .split('\n')
      .filter((item) => !!item.trim())
      .map((item) => item.trim().split(' '));

    state.forEach((item, i) => {
      item.forEach((symbol, j) => {
        if (symbol === 'X') this.game.makeUserMove(i, j);
      });
    });

    return this;
  }

  build() {
    return this.game;
  }
}

export default GameBuilder;
