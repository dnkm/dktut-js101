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
    this.items = {};

    this.spawnUnits(20);
    this.spawnItems(200);

    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this), false);
  }

  spawnItems(num) {
    for (var i = 0; i < num; i++) {
      var x = parseInt(this.width * Math.random());
      var y = parseInt(this.height * Math.random());

      var itemId = x + "," + y;
      var item = new Item(itemId, x, y);
      this.items[itemId] = item;
    }
  }

  spawnUnits(num) {
    for (var i = 0; i < num; i++) {
      if (i == 0) {
        var unit = new Unit(i, this.width * Math.random(), this.height * Math.random());
      } else {
        var unit = new AIUnit(i, this.width * Math.random(), this.height * Math.random());
      }

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

  onMouseMove(e) {
    var vp = this.getViewport();

    var x = e.clientX + vp.x1;
    var y = e.clientY + vp.y1;

    this.units[0].moveTowards(x, y);
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
    this.drawItems(vp);
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
    this.checkCollisionUnit(unit);
    this.checkCollisionItem(unit);
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

  checkCollisionUnit(unit) {
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

        // precise calculation
        if (that.didCollide(unit, unit2)) {
          that.handleCollision(unit, unit2);
        }

      }
    });
  }

  checkCollisionItem(unit) {
    var x = parseInt(unit.x);
    var y = parseInt(unit.y);

    for (var dy = y - unit.radius; dy <= y + unit.radius; dy++) {
      for (var dx = x - unit.radius; dx <= x + unit.radius; dx++) {
        var item = this.items[dx + "," + dy];

        if (typeof item !== 'undefined') {
          if (this.didCollide(unit, item)) {
            unit.addPoint(1);
            delete this.items[item.id];
          }
        }
      }
    }

  }

  didCollide(unit, unit2) {
    var dx = Math.abs(unit.x - unit2.x);
    var dy = Math.abs(unit.y - unit2.y);
    var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (distance <= unit.radius + unit2.radius) {
      return true;
    } else {
      return false;
    }
  }

  handleCollision(unit, unit2) {
    if (unit.level == unit2.level) {
      this.handleLoss(unit);
      this.handleLoss(unit2);
    } else if (unit.level > unit2.level) {
      this.handleWin(unit, unit2);
      this.handleLoss(unit2);
    } else {
      this.handleWin(unit2, unit);
      this.handleLoss(unit);
    }
  }

  handleWin(winner, loser) {
    winner.addPoint(loser.point);
  }

  handleLoss(unit) {
    if (unit.id === 0) {
      this.stop();
    }
    delete this.units[unit.id];
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

  drawItems(vp) {
    var that = this;
    for (var key in this.items) {
      this.items[key].draw(that.ctx, vp);
    }
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