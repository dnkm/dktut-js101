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

        this.moveTimer = 120;
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
        this.border = 0.1 + (0.1 * (this.level - 1));
    }

    move() {
        this.x += this.velX;
        this.y += this.velY;

        this.moveTimer--;
        if (this.moveTimer <= 0) {
            this.moveTimer = 30 + 30 * Math.random();
            this.velX = this.getRandomVel();
            this.velY = this.getRandomVel();
        }
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
            ctx.font = '10px Arial';
            ctx.fillText("P", x - 3, y + 3);
        }
    }
}