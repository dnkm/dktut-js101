var ball = document.querySelector("#ball");
var FPS = 60;
var velocityY = 1;
var velocityX = 0;
var GROUND = 600 - 10;
var BOUNCINESS = 0.95;

initBall();
var game = setInterval(nextMove, 1000/FPS);

function initBall() {
	ball.style.left = '100px';
  ball.style.top = '0px';
}

function nextMove() {
	var y = parseInt(ball.style.top);
  y += velocityY;
  y = Math.min(y, GROUND);
  
  if (y == GROUND) {
  	if (velocityY < 0.5) {
    	clearInterval(game);
    }
  	velocityY *= -BOUNCINESS;
  	console.log(velocityY);
  }
  
  
  ball.style.top = y + 'px';
  velocityY++;
  
  nextMoveX();
}

function nextMoveX() {
	var x = parseInt(ball.style.left);
  x += velocityX; 
  x = Math.max(10, x);
  x = Math.min(190, x);
  
  if (x==10 || x==190) {
  	velocityX *= -1;
  }
  
  ball.style.left = x + 'px';
  
}

function push(mod) {
	if (velocityX == 0) {
  	velocityX = 1;
  } else {
  	velocityX *= mod;
  }
	
}

/*
#### Add Ground

#### Add Gravity

#### Add Acceleration

#### Framerate

#### Bounce

#### End Condition

#### CLICK

#### Bound-Back x direction

*/