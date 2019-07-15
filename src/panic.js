

class Panic extends State {
    constructor() {
        super();
        this.score = 0;
        this.hiscore = 0;
        this.player = new Player();
        this.particles = new Particles();
        this.aliens = new Aliens();

        this.bullets = [];
        this.shots = [];

        this.gameOver = false;
        this.coolDown = .3;
        this.bullet = R.image(Grfx.BULLET);
        this.moon = R.image(Grfx.MOON);
        this.moon.pos = {x:Options.WIDTH, y:80};

        this.reset();
    }

    reset() {
        K.clear();
        K.addKey(17, (e) => {
            if(this.coolDown === 0) {
                this.startShoot();
                this.coolDown = .3;
            }
        });

        this.bullets = [];
        this.shots = [];
        this.coolDown = .3;
        this.player.reset();
        this.particles.reset();
        this.aliens.reset();
        this.score = 0;
        this.gameOver = false;
    }

    startShoot() {
        if(this.gameOver) return;
        this.bullets.push({
            x: this.player.x + (this.player.ship.width >> 1) - 2,
            y: this.player.y
        })
    }

    startExplosion(box, player) {
        this.particles.start((box.l + box.r) >> 1, (box.t + box.b) >> 1);

        if(player) {
            this.gameOver = true;
            this.checkHiscore();
            K.clear();
            K.addKey(32, (e) => {
                window.dispatchEvent(new CustomEvent("stateChange", {
                    detail: {
                        state: Options.MENU
                    }
                }));
            });
        }
    }

    checkCollision() {
        function collided(a, b) {
            return !(((a.b < b.t) || (a.t > b.b) || (a.r < b.l) || (a.l > b.r)));
        }

        const pbox = {
            l: this.player.x, t: this.player.y,
            r: this.player.x + this.player.ship.width,
            b: this.player.y + this.player.ship.height
        };

        for(let a = this.aliens.waveShips.length - 1; a > -1; a--) {
            const an = this.aliens.waveShips[a];
            const abox = {
                l: an.x, t: an.y,
                r: an.x + this.aliens.aliens[an.g].width,
                b: an.y + this.aliens.aliens[an.g].height
            };

            if(collided(pbox, abox)) {
                this.startExplosion(pbox, true);
            }

            for(let b = this.bullets.length - 1; b > -1; b--) {
                const bl = this.bullets[b];
                const bbox = {
                    l: bl.x, t: bl.y,
                    r: bl.x + this.bullet.width,
                    b: bl.y + this.bullet.height
                }
                if(collided(abox, bbox)) {
                    this.startExplosion(abox, false);
                    this.bullets.splice(b, 1);
                    this.aliens.waveShips.splice(a, 1);
                    this.score += 5;
                    continue;
                }
            }
        }
        
        if(this.aliens.waveShips.length < 1) {
            this.score += 10 * this.aliens.wave;
            this.aliens.nextWave();
        }
    }

    update(dt) {
        if((this.coolDown -= dt) < 0) {
            this.coolDown = 0;
        }

        this.aliens.update(dt);

        if(!this.gameOver) {
            this.player.update(dt);
            this.checkCollision();
        }

        this.particles.update(dt);

        for(let b = this.bullets.length - 1; b > -1; b--) {
            this.bullets[b].y -= dt * 350;
            if(this.bullets[b].y < -this.bullet.height) {
                this.bullets.splice(b, 1);
            }
        }
        
        this.moon.pos.x -= dt * 2;
        this.moon.pos.y -= dt * .5;
        if(this.moon.pos.x < -this.moon.width) {
            this.moon.pos = {x:Options.WIDTH - 200, y:100};
        }
    }

    draw(ctx) {
        ctx.drawImage(R.image(Grfx.BACK), 0, 0);
        ctx.drawImage(this.moon, this.moon.pos.x, this.moon.pos.y);
        this.aliens.draw(ctx);
        
        for(let b = this.bullets.length - 1; b > -1; b--) {
            const z = this.bullets[b];
            ctx.drawImage(this.bullet, z.x, z.y);
        }

        this.particles.draw(ctx);

        if(!this.gameOver) this.player.draw(ctx);

        if(this.gameOver) {
            ctx.fillStyle = "#000";
            ctx.textAlign = "center";
            ctx.font = "28px 'Press Start 2P'"; 
            ctx.fillText("GAME OVER", Options.WIDTH >> 1, Options.HEIGHT * .5);

            ctx.font = "14px 'Press Start 2P'"; 
            ctx.fillText("PRESS SPACE", Options.WIDTH >> 1, Options.HEIGHT * .7);
        }

        ctx.font = "14px 'Press Start 2P'"; 
        ctx.textAlign = "left";
        ctx.fillText(`SCORE: ${this.score}`, 0, 20);
        ctx.textAlign = "right";
        ctx.fillText(`WAVE: ${this.aliens.wave}`, Options.WIDTH, 20);
    }

    start() {
        this.reset();
        this.hiscore = parseInt(localStorage.getItem('fatfrog_panic')) || 0;
    }

    checkHiscore() {
        if(this.score > this.hiscore) {
            localStorage.setItem('fatfrog_panic', `${this.score}`);
        }
    }
}