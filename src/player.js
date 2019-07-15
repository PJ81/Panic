

class Player {
    constructor() {
        this.ship = R.image(Grfx.SHIP);
        this.x = this.y = 0;
        this.speed = 250;
        this.moveLeft = this.moveRight = false;
        this.reset();
    }

    reset() {
        this.x = (Options.WIDTH >> 1) - (this.ship.width >> 1);
        this.y = Options.HEIGHT - this.ship.height - 10;
        this.moveLeft = this.moveRight = false;
        this.coolDown = .1;

        K.addKey(37, (e) => {
            this.moveLeft = e === PRESSED;
        });
        K.addKey(39, (e) => {
            this.moveRight = e === PRESSED;
        });
    }

    update(dt) {
        if(this.moveLeft && this.x > 2) this.x -= dt * this.speed;
        if(this.moveRight && this.x < (Options.WIDTH - this.ship.width - 2)) this.x += dt * this.speed;
    }

    draw(ctx) {
        ctx.drawImage(this.ship, this.x, this.y);
    }
}