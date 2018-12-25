import Vector from './Vector.js';
import Snake from './Snake.js';

export default class Game {
  constructor() {
    this.bw = 12; // 一個格子的寬度
    this.bs = 2; // 格子間的間隔
    this.gameWidth = 40; // 格子數
    this.snake = new Snake();
    this.foods = [];
    this.start = false;
    this.events = {};
  }

  init() {
    this.canvas = document.getElementById('myCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = (this.bw + this.bs) * this.gameWidth - this.bs;
    this.canvas.height = this.canvas.width;
    this.update();
    this.render();
    this.generateFood();
  }

  on(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn)
  }

  trigger(eventName, ...args) {
    this.events[eventName].forEach(fn => {
      fn.apply(this, args);
    })
  }

  startGame() {
    this.start = true;
    this.snake = new Snake();
    this.trigger('GAME_START');
  }

  endGame() {
    this.start = false;
    let score = (this.snake.maxLength - 5) * 10;
    this.trigger('GAME_END', score);
  }

  generateFood() {
    let x = Math.random() * this.gameWidth | 0;
    let y = Math.random() * this.gameWidth | 0;
    this.foods.push(new Vector(x, y));
    this.drawEffect(x, y);
  }

  update() {
    if (this.start) {
      this.snake.update();
      this.foods.forEach((food, i) => {
        if (this.snake.head.equal(food)) {
          this.snake.maxLength++;
          this.foods.splice(i, 1); // 這樣會有問題
          this.generateFood();
        }
      });
      // check collide self
      this.snake.body.forEach(bodyPosition => {
        if (this.snake.head.equal(bodyPosition)) {
          this.endGame();
        }
      });
      // check collide boundary
      if (!this.snake.checkBoundary(this.gameWidth)) {
        this.endGame();
      }
    }
    setTimeout(() => {
      this.update();
    }, 150);
  }

  getPosition(x, y) {
    return new Vector(
      (this.bw + this.bs) * x,
      (this.bw + this.bs) * y
    );
  }

  drawBlock(v, color) {
    this.ctx.fillStyle = color;
    let pos = this.getPosition(v.x, v.y);
    this.ctx.fillRect(pos.x, pos.y, this.bw, this.bw);
  }

  drawEffect(x, y) {
    let r = 1;
    let pos = this.getPosition(x, y);
    const effect = () => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = `rgba(255, 0, 0, ${ (100 - r) / 100 })`;
      this.ctx.arc(
        pos.x + this.bw / 2,
        pos.y + this.bw / 2,
        r,
        0,
        Math.PI * 2
      );
      this.ctx.stroke();
      r += 1;
      if (r <= 100) {
        window.requestAnimationFrame(effect);
      }
    }
    window.requestAnimationFrame(effect);
  }

  render() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, .3)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // draw blocks
    for (let x = 0; x < this.gameWidth; x++) {
      for (let y = 0; y < this.gameWidth; y++) {
        this.drawBlock(new Vector(x, y), 'rgba(255, 255, 255, .03)');
      }
    }
    // draw snake
    this.snake.body.forEach(snakePosition => {
      this.drawBlock(snakePosition, 'white');
    })
    // draw food
    this.foods.forEach(foodPosition => {
      this.drawBlock(foodPosition, 'red');
    });
    requestAnimationFrame(() => {
      this.render();
    })
  }
}