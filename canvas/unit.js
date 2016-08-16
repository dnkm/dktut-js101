class Unit {
    constructor(x, y) {
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
        return Math.random() * plusOrMinus;
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

        //this.x = Math.min(Math.max(this.x, 0), this.canvas.width);
        //this.y = Math.min(Math.max(this.y, 0), this.canvas.height);
    }

    draw(ctx) {
        
        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = this.border;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}