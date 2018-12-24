import Vector from "./Vector.js";

export default class Snake {
  constructor() {
    this.body = [];
    this.maxLength = 5;
    this.head = new Vector();
    this.speed = new Vector(1, 0);
    this._direction = 'Right';
  }

  get direction() {
    this._direction;
  }

  set direction(dir) {
    let target;
    switch(dir) {
      case 'Up':
        target = new Vector(0, -1);
        break;
      case 'Down':
        target = new Vector(0, 1);
        break;
      case 'Left':
        target = new Vector(-1, 0);
        break;
      case 'Right':
        target = new Vector(1, 0);
        break;
    }
    // 如果按下方向和原本方向的相反不同的話 才改變 speed
    if (target && target.equal(this.speed.mul(-1)) === false) {
      this.speed = target;
    }
    
  }

  checkBoundary(gameWidth) {
    let xInRange = this.head.x >= 0 && this.head.x < gameWidth;
    let yInRange = this.head.y >= 0 && this.head.y < gameWidth;
    return xInRange && yInRange;
  }

  update() {
    let newHead = this.head.add(this.speed);
    this.body.push(this.head);
    this.head = newHead;
    while (this.body.length > this.maxLength) {
      this.body.shift();
    }
  }
}
