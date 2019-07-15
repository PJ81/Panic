

class Aliens {
    constructor() {
        this.aliens = [
            R.image(Grfx.A0),
            R.image(Grfx.A1),
            R.image(Grfx.A2)
        ];
        this.wave = 1;
        this.waveShips = [];
        this.reset();
    }

    nextWave() {
        this.wave++;
        this.createWave();
    }

    draw(ctx) {
        for(let a = 0; a < this.waveShips.length; a++) {
            const b = this.waveShips[a];
            ctx.drawImage(this.aliens[b.g], b.x, b.y);
        }
    }

    update(dt) {
        for(let a = 0; a < this.waveShips.length; a++) {
            const b = this.waveShips[a];
            b.x += b.vx * dt;
            b.y += b.vy * dt;

            if((b.t -= dt) < 0) {
                b.vy = Math.random() * 200 + 50;
                b.vx = Math.random() * 200 + 50;
                b.t = rand(10, 30);
            }

            if( b.y < 0) b.vy = Math.abs(b.vy);
            else if( b.y > Options.HEIGHT - this.aliens[b.g].height) b.vy = -b.vy;
            if( b.x < 0) b.vx = Math.abs(b.vx);
            else if( b.x > Options.WIDTH - this.aliens[b.g].width) b.vx = -b.vx;
        }
    }

    createWave() {
        this.waveShips = [];
        for(let z = 0; z < this.wave + 4; z++) {
            const side = Math.random() > .5 ? 1 : -1,
                  grf = rand(0, 3);
            this.waveShips.push({
                a: true,
                g: grf,
                t: rand(10, 30),
                y: rand(0, 50),
                vy: Math.random() * 200 + 50,
                x: side > 0 ? 0 : Options.WIDTH - this.aliens[grf].width,
                vx: side * (Math.random() * 200 + 50)
            });
        }
    }

    reset() {
        this.wave = 1;
        this.createWave();
    }
}