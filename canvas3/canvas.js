class Circle {
  constructor(x,y,velX,velY,radius,strokeColor,fillColor,lineWidth,cv,ctx) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.radius = radius;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.lineWidth = lineWidth;
    this.cv = cv;
    this.ctx = ctx;
  }
  draw() {
    var ctx = this.ctx;
    var cv = this.cv;

    ctx.strokeStyle=this.strokeColor;
    ctx.fillStyle=this.fillColor;
    ctx.lineWidth=this.lineWidth;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();

    /  
  }
  /*
  recalculateXY() {
    if (x+radius >= cv.width ||
        x-radius <= 0) {
          velX *= -1;
        }

      if (y+radius >= cv.height ||
          y-radius <= 0) {
            velY *= -1;
          }


    x += velX;
    y += velY;
  }*/
}

var cv = document.querySelector("#cv");
var ctx = cv.getContext("2d");

var circles = [];
for(var i=0; i<10; i++) {
  circles[i] = new Circle(10+i, 10+i, 10, 10, 10, 'red','black', 3, cv, ctx);
  // TODO - randomize color, size, initial velocity....
}

function draw() {
  for(var i=0; i<circles.length; i++) {
    circles[i].draw();
  }
}

setInterval(draw, 1000/60);
