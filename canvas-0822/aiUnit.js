class AIUnit extends Unit {

    constructor(id, x, y) {
        super(id, x, y);
        this.moveTimer = 0;
    }

    move() {
        this.x += this.velX;
        this.y += this.velY;

        // random movement
        this.moveTimer--;
        if (this.moveTimer <= 0) {

            var angle = -Math.PI + (Math.random() * 2 * Math.PI);
            this.velX = this.velMax * Math.cos(angle);
            this.velY = this.velMax * Math.sin(angle);

            this.moveTimer = 120 + 30 * Math.random();        //  120 frames = 2 sec @ 60 FPS
        }
    }
}