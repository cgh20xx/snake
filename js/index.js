import Game from './Game.js';
const game = new Game();
game.init();

let keydownHandler = function(e) {
  console.log(e);
  game.snake.direction = e.key.replace('Arrow', '');
}

window.addEventListener('keydown', keydownHandler);