class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.width = canvas.width;
        this.height = canvas.height;

        this.units = [];

        this.spawnUnits(10);
    }

    spawnUnits(num) {
        for (var i = 0; i < num; i++) {
            var unit = new Unit(this.width / 2, this.height / 2, this.canvas, this.ctx);
            this.units.push(unit);
        }
    }

    start() {
        var draw = this.draw.bind(this);
        setInterval(draw, 1000 / 60);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawGrid();
        this.drawUnits();
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

    drawUnits() {

    }


}