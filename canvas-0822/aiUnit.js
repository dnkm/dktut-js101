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
            this.moveTimer = 120 + 30 * Math.random();        //  120 frames = 2 sec @ 60 FPS
            this.velX = this.getRandomVel();
            this.velY = this.getRandomVel();
        }
    }
}