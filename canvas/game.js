class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.width = canvas.width * 2;
    this.height = canvas.height * 2;

    this.procId = -1;
    this.units = [];
    this.items = {};

    this.spawnUnits(20);
    this.spawnItems(100);

    this.gridWidth = 100;
    this.fps = 60;

    canvas.addEventListener("mousemove", this.onMouseMove.bind(this), false);
  }

  onMouseMove(e) {
    var vp = this.getViewport();

    var x = e.clientX + vp.x1;
    var y = e.clientY + vp.y1;

    this.units[0].moveTowards(x, y);
  }

  spawnUnits(num) {
    for (var i = 0; i < num; i++) {
      if (i == 0) {
        var unit = new Unit(i, this.width * Math.random(), this.height * Math.random());
        this.units.push(unit);
      } else {
        var unit = new AIUnit(i, this.width * Math.random(), this.height * Math.random());
        this.units.push(unit);
      }

    }
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

  start() {
    var draw = this.draw.bind(this);
    this.procId = setInterval(draw, 1000 / this.fps);
  }

  stop() {
    clearInterval(this.procId);
  }

  draw() {
    this.moveUnits();

    if (typeof this.units[0] === 'undefined') {
      return;
    }

    var vp = this.getViewport();

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawGrid(vp);
    this.drawItems(vp);
    this.drawUnits(vp);
  }

  getViewport() {
    var p1 = this.units[0];
    var vp = {};
    vp.x1 = p1.x - this.canvas.width / 2;
    vp.y1 = p1.y - this.canvas.height / 2;

    vp.x1 = Math.max(Math.min(vp.x1, this.width - this.canvas.width), 0);
    vp.y1 = Math.max(Math.min(vp.y1, this.height - this.canvas.height), 0);
    return vp;
  }

  moveUnits() {
    /*
    for(var i=0; i<this.units.length; i++) {
      this.units[i].move();
      this.checkCollision(this.units[i]);
    }
    */
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

        // precise detection
        var dx = unit.x - unit2.x;
        var dy = unit.y - unit2.y;
        var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

        if (distance <= unit.radius + unit2.radius) {
          that.handleCollision(unit, unit2);
        }


      }
    });
  }

  didCollide(unit, unit2) {
    var dx = unit.x - unit2.x;
    var dy = unit.y - unit2.y;
    var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    if (distance <= unit.radius + unit2.radius) {
      return true;
    } else {
      return false;
    }
  }

  checkCollisionItem(unit) {
    var x = parseInt(unit.x);
    var y = parseInt(unit.y);

    for (var dy = y - unit.radius; dy <= y + unit.radius; dy++) {
      for (var dx = x - unit.radius; dx <= x + unit.radius; dx++) {
        var item = this.items[dx + "," + dy];

        if (typeof item !== 'undefined') {
          if (this.didCollide(unit, item)) {
            delete this.items[item.id];
          }
        }
      }
    }
  }

  handleCollision(unit, unit2) {
    if (unit.id === 0 || unit2.id === 0) {
      this.stop();
    }

    delete this.units[unit.id];
    delete this.units[unit2.id];
  }

  drawUnits(vp) {
    var that = this;
    this.units.forEach(function (unit) {
      unit.draw(that.ctx, vp);
    });
  }

  drawItems(vp) {
    for (var key in this.items) {
      this.items[key].draw(this.ctx, vp);
    }
  }

  drawGrid(vp) {
    var ctx = this.ctx;
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;

    for (var y = 0; y < this.height; y += this.gridWidth) {
      ctx.beginPath();
      ctx.moveTo(0, y - vp.y1);
      ctx.lineTo(this.width, y - vp.y1);
      ctx.stroke();
    }

    for (var x = 0; x < this.width; x += this.gridWidth) {
      ctx.beginPath();
      ctx.moveTo(x - vp.x1, 0);
      ctx.lineTo(x - vp.x1, this.height);
      ctx.stroke();
    }

    ctx.fillStyle = 'gray';
    ctx.font = '10px Arial';
    for (var y = 0; y < this.height; y += this.gridWidth) {
      for (var x = 0; x < this.width; x += this.gridWidth) {
        ctx.fillText(x, x - vp.x1, y - vp.y1);
      }
    }

  }
}