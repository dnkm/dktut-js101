class AIUnit extends Unit {
    constructor(id, x, y) {
        super(id, x, y);
        this.moveTimer = 120;
    }

    move() {
        this.x += this.velX;
        this.y += this.velY;

        this.moveTimer--;
        if (this.moveTimer <= 0) {
            var angle = -Math.PI + (Math.random() * 2 * Math.PI);
            this.velX = this.velMax * Math.cos(angle);
            this.velY = this.velMax * Math.sin(angle);

            this.moveTimer = 30 * ( 30 + Math.random() );
        }
    }
}