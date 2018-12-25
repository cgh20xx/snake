import Game from './Game.js';
const btnStartGame = document.getElementById('btnStartGame');
const panel = document.querySelector('.panel');
const h2 = panel.querySelector('h2');
const game = new Game();
game.init();

game.on('GAME_START', function() {
  console.log('game start!!');
  panel.style.display = 'none';
});

game.on('GAME_END', function(score) {
  console.log('game end!!');
  h2.textContent = `Score: ${score}`;
  panel.style.display = 'block';
});

let clickHandler = function(e) {
  game.startGame();
}

btnStartGame.addEventListener('click', clickHandler);

let keydownHandler = function(e) {
  game.snake.direction = e.key.replace('Arrow', '');
}

window.addEventListener('keydown', keydownHandler);