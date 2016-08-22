class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.width = canvas.width * 2;
    this.height = canvas.height * 2;

    this.gridWidth = 100;
    this.fps = 60;

    this.procId = -1;
    this.units = [];

    this.spawnUnits(20);

    canvas.addEventListener("click", this.onClick.bind(this), false);
  }

  spawnUnits(num) {
    for (var i = 0; i < num; i++) {
      var unit = new Unit(i, this.width * Math.random(), this.height * Math.random());
      this.units.push(unit);
    }
  }

  start() {
    var draw = this.draw.bind(this);
    this.procId = setInterval(draw, 1000 / this.fps);
  }

  stop() {
    clearInterval(this.procId);
  }

  onClick(e) {
    var vp = this.getViewport();

    var x = e.clientX + vp.x1;
    var y = e.clientY + vp.y1;

    this.units[0].x = x;
    this.units[0].y = y;
  }

  draw() {
    this.moveUnits();

    // if player is dead, stop
    if (typeof this.units[0] === 'undefined') {
      return;
    }

    var vp = this.getViewport();

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawGrid(vp);
    this.drawUnits(vp);
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

        if (unit.id === 0) console.log(`collision between ${unit} & ${unit2}`);

        // precise calculatio
        var dx = Math.abs(unit.x - unit2.x);
        var dy = Math.abs(unit.y - unit2.y);
        var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        if (distance <= unit.radius + unit2.radius) {
          if (unit.id === 0) console.log("hit!");
          that.handleCollision(unit, unit2);
        } else {
          if (unit.id === 0) console.log("miss!");
        }
      }
    });
  }

  handleCollision(unit, unit2) {
    if (unit.id === 0) {
      this.stop();
    }

    delete this.units[unit.id];
    delete this.units[unit2.id];
  }

  getViewport() {
    // calculate viewports
    var p1 = this.units[0];
    var vp = {};
    vp.x1 = p1.x - this.canvas.width / 2;
    vp.x1 = Math.max(Math.min(vp.x1, this.width - this.canvas.width), 0);
    vp.x2 = vp.x1 + this.canvas.width;

    vp.y1 = p1.y - this.canvas.height / 2;
    vp.y1 = Math.max(Math.min(vp.y1, this.height - this.canvas.height), 0);
    vp.y2 = vp.y1 + this.canvas.height;
    return vp;
  }

  drawUnits(vp) {
    var that = this;
    this.units.forEach(function (unit) {
      unit.draw(that.ctx, vp);
    });

  }

  drawGrid(vp) {
    var ctx = this.ctx;
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;

    for (var y = 0; y < this.height; y += this.gridWidth) {
      ctx.beginPath();
      ctx.moveTo(0 - vp.x1, y - vp.y1);
      ctx.lineTo(this.width - vp.x1, y - vp.y1);
      ctx.stroke();
    }

    for (var x = 0; x < this.width; x += this.gridWidth) {
      ctx.beginPath();
      ctx.moveTo(x - vp.x1, 0 - vp.y1);
      ctx.lineTo(x - vp.x1, this.height - vp.y1);
      ctx.stroke();
    }

    ctx.fillStyle = 'gray';
    ctx.font = '10px Arial';
    for (var y = 0; y < this.height; y += this.gridWidth) {
      for (var x = 0; x < this.width; x += this.gridWidth) {
        ctx.fillText(`${x}`, x - vp.x1, y - vp.y1);
      }
    }

  }
}