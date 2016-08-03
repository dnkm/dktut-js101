var cv = document.querySelector("#cv");
var ctx = cv.getContext("2d");


var x = 100;
var y = 100;
var r = 50;
var velX = 5;
var velY = 5;

function drawFrame() {
    ctx.clearRect(0, 0, cv.width, cv.height);   // ADD 1

    ctx.strokeStyle="blue";
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.stroke();

    recalculateXY();
}

function recalculateXY() {
    // ADD 1
    if (x + r >= cv.width) {
        velX *= -1;
    }
    if (y + r >= cv.height) {
        velY *= -1;
    }

    // ADD 2
    if (x - r <= 0) {
        velX *= -1;
    }
    if (y - r <= 0) {
        velY *= -1;
    }

    x += velX;
    y += velY;
}

function handleKeyboard(e) {
    switch(e.keyCode)
    {
        //left
        case 37:
                velX--;
                break;

        //up
        case 38:
                velY--;
                break;

        //right
        case 39:
                velX++;
                break;

        //down
        case 40:
                velX--;
                break;
    }
}

setInterval(drawFrame, 1000/60);
window.addEventListener('keydown', handleKeyboard, false);
