class Unit {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;

        this.velX = this.getRandomVel();
        this.velY = this.getRandomVel();
        this.color = this.getRandomColor();

        this.level = 1;
        this.point = 0;

        this.type = type;
        this.isDead = false;

        this.calculateSize();
    }

    getRandomVel() {
        var plusOrMinus = (Math.random() < 0.5) ? -1 : 1;
        return (Math.random() + 0.5) * plusOrMinus;
    }

    getRandomColor() {
        return "#" + Math.random().toString(16).slice(2, 8).toUpperCase();
    }

    calculateSize() {
        this.radius = 10 + (2 * (this.level - 1));
        this.border = 0.1 + (0.1 * (this.level - 1));
    }

    move() {
        if (this.isDead) {
            return;
        }
        this.x += this.velX;
        this.y += this.velY;
    }

    draw(ctx) {
        if (this.isDead) {
            return;
        }

        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = this.border;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        //ctx.moveTo(this.x - this.radius, this.y - this.radius);

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2);
    }
}