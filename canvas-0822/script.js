var canvas = document.querySelector("#cv");

canvas.width = document.body.scrollWidth;
canvas.height = document.body.scrollHeight;

var game = new Game(canvas);
game.start();