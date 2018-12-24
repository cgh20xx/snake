import Vector from './Vector.js';
import Snake from './Snake.js';

export default class Game {
  constructor() {
    this.bw = 12; // 一個格子的寬度
    this.bs = 2; // 格子間的間隔
    this.gameWidth = 40; // 格子數
    this.snake = new Snake();
    this.foods = [];
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

  generateFood() {
    let x = Math.random() * this.gameWidth | 0;
    let y = Math.random() * this.gameWidth | 0;
    this.foods.push(new Vector(x, y));
  }

  update() {
    this.snake.update();
    this.foods.forEach((food, i) => {
      if (this.snake.head.equal(food)) {
        this.snake.maxLength++;
        this.foods.splice(i, 1); // 這樣會有問題
        this.generateFood();
      }
    });
    setTimeout(() => {
      this.update();
    }, 200);
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