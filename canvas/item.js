class Item {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;

        this.color = this.getRandomColor();
        this.radius = 3;
    }

    getRandomColor() {
        return "#" + Math.random().toString(16).slice(2, 8).toUpperCase();
    }

    draw(ctx, vp) {

        var x = this.x - vp.x1;
        var y = this.y - vp.y1;

        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}