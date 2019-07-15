

class Game {
	constructor() {
        const canvas = document.createElement('canvas');
		canvas.width = Options.WIDTH * Options.SCALE;
		canvas.height = Options.HEIGHT * Options.SCALE;
        document.body.appendChild(canvas);
        this.ctx = canvas.getContext('2d');

        this.lastTime = 0;
        this.accumulator = 0;
        this.deltaTime = 1 / 60;

		this.loop = (time) => {
			this.accumulator += (time - this.lastTime) / 1000;
			while(this.accumulator > this.deltaTime) {
				this.accumulator -= this.deltaTime;
                this.state.update(Math.min(this.deltaTime, .5));
			}
            this.state.draw(this.ctx);
			this.lastTime = time;
			requestAnimationFrame(this.loop);
        }

        this.panic = new Panic();
        this.menu = new Menu();
        
        this.state = this.menu;

        this.state.start();

        this.ctx.scale(Options.SCALE, Options.SCALE);

        window.addEventListener("stateChange", (e) => {
            switch(e.detail.state) {
                case Options.GAME:
                    this.state = this.panic;
                break;
                case Options.MENU:
                    this.state = this.menu;
                break;
                case Options.GAMEOVER:
                    //this.state = this.go;
                break;
            }
            this.state.start();
        });
        
        this.loop(0);
    }
}

const K = new Keyboard();
const R = new Resources(() => new Game());