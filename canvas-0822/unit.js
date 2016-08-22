class Unit {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;

        this.velX = this.getRandomVel();
        this.velY = this.getRandomVel();
        this.color = this.getRandomColor();

        this.level = 1;
        this.point = 0;

        this.calculateSize();
    }

    getRandomVel() {
        var plusOrMinus = (Math.random() < 0.5) ? -1 : 1;
        return (1 + 0.5 * Math.random()) * plusOrMinus;
    }

    getRandomColor() {
        return "#" + Math.random().toString(16).slice(2, 8).toUpperCase();
    }

    calculateSize() {
        this.radius = 10 + (2 * (this.level - 1));
        this.border = 0.4 + (0.2 * (this.level - 1));
        this.velMax = 2;
    }

    move() {
        this.x += this.velX;
        this.y += this.velY;
    }

    moveTowards(x, y) {
        var dx = x - this.x;
        var dy = y - this.y;

        var angle = Math.atan2(dy, dx);
        this.velX = this.velMax * Math.cos(angle);
        this.velY = this.velMax * Math.sin(angle);
    }

    draw(ctx, vp) {

        var x = this.x - vp.x1;
        var y = this.y - vp.y1;

        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = this.border;

        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        if (this.id === 0) {
            ctx.fillStyle = 'white';
            ctx.font = "10px Arial";
            ctx.fillText("P", x - 3, y + 3);
        }
    }

    toString() {
        return `(${this.id} @ (${this.x}, ${this.y}))`
    }
}