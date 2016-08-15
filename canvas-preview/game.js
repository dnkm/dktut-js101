class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.width = canvas.width;
    this.height = canvas.height;

    this.procId = -1;
    this.units = [];

    this.spawnUnits(10);
  }

  spawnUnits(num) {
    for (var i = 0; i < num; i++) {
      var x = this.width / 2;
      var y = this.height / 2;

      x = Math.random() * this.width;
      y = Math.random() * this.height;


      var unit = new Unit(x, y, this.canvas, this.ctx);
      this.units.push(unit);
    }
  }

  start() {
    var draw = this.draw.bind(this);
    setInterval(draw, 1000 / 60);
  }

  draw() {
    this.moveUnits();

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawGrid();
    this.drawUnits();
  }

  moveUnits() {
    for (var i = 0; i < this.units.length; i++) {
      this.units[i].move();

      this.checkCollisions(this.units[i], i);
    }
  }

  checkCollisions(unit, myI) {
    // check wall collision
    unit.x = Math.min(Math.max(unit.x, 0), this.canvas.width);
    unit.y = Math.min(Math.max(unit.y, 0), this.canvas.height);

    if (unit.x % this.canvas.width == 0) {
      unit.velX *= -1;
    }

    if (unit.y % this.canvas.height == 0) {
      unit.velY *= -1;
    }

    // check unit collision
    for (var i = 0; i < this.units.length; i++) {
      if (i == myI) {
        continue;
      }

      var collided = this.checkUnitCollision(unit, this.units[i]);
      if (collided) {
        this.units[i].isDead = true;
      }
    }
  }

  checkUnitCollision(u1, u2) {
    // simple check
    if (Math.abs(u1.x - u2.x) > 1
      && Math.abs(u1.y - u2.y) > 1
    ) {
      return false;
    }

    return true;
  }

  drawUnits() {
    for (var i = 0; i < this.units.length; i++) {
      this.units[i].draw(this.ctx);
    }
  }

  drawGrid() {
    var ctx = this.ctx;
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;

    for (var y = 0; y < this.height; y += this.height / 10) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }

    for (var x = 0; x < this.width; x += this.width / 10) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }

  }
}