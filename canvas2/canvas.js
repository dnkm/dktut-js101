var cv = document.querySelector("#cv");
var ctx = cv.getContext("2d");

var x = 100;
var y = 100;
var radius = 50;
var velX = 5;
var velY = 5;

function draw() {
  ctx.clearRect(0, 0, cv.width, cv.height);

  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2*Math.PI);
  ctx.stroke();

  recalculateXY();
}

function recalculateXY() {
  if (x+radius >= cv.width ||
      x-radius <= 0) {
        velX *= -1;
      }

  x += velX;
  y += velY;
}

setInterval(draw, 1000/60);
