class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.width = canvas.width + 100;
    this.height = canvas.height + 100;

    this.procId = -1;
    this.units = [];

    this.spawnUnits(10);
  }

  spawnUnits(num) {
    for (var i = 0; i < num; i++) {
      var unit = new Unit(i, this.width * Math.random(), this.height * Math.random());
      this.units.push(unit);
    }
  }

  start() {
    var draw = this.draw.bind(this);
    this.procId = setInterval(draw, 1000 / 60);
  }

  stop() {
    clearInterval(this.procId);
  }

  draw() {
    this.moveUnits();

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawGrid();
    this.drawUnits();
  }

  moveUnits() {
    var that = this;
    this.units.forEach(function (unit) {
      unit.move();
      that.checkCollision(unit);
    });
  }

  checkCollision(unit) {
    this.checkCollisionWall(unit);
    this.checkCollisionObj(unit);
  }

  checkCollisionWall(unit) {
    unit.x = Math.min(Math.max(unit.x, 0), this.width);
    unit.y = Math.min(Math.max(unit.y, 0), this.height);

    if (unit.x % this.width == 0) {
      unit.velX *= -1;
    }

    if (unit.y % this.height == 0) {
      unit.velY *= -1;
    }

  }

  checkCollisionObj(unit) {
    var that = this;
    this.units.forEach(function (unit2) {
      if (unit.id == unit2.id) {
        return;
      }

      if (
        Math.abs(unit.x - unit2.x) < unit.radius + unit2.radius
        &&
        Math.abs(unit.y - unit2.y) < unit.radius + unit2.radius
      ) {

        if (unit.id === 0 || unit2.id === 0) {
          that.stop();
        }

        delete that.units[unit.id];
        delete that.units[unit2.id];

      }
    });
  }

  drawUnits() {
    var that = this;
    this.units.forEach(function (unit) {
      unit.draw(that.ctx);
    });
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

    ctx.fillStyle = 'gray';
    ctx.font = '10px Arial';
    for (var y = 0; y < this.height; y += this.height / 10) {
      for (var x = 0; x < this.width; x += this.width / 10) {
        ctx.fillText(`${x}`, x, y);
      }
    }

  }
}