

class Menu extends State {
    constructor() {
        super();
        this.hiscore = 0;
    }

    draw(ctx) {
        ctx.drawImage(R.image(Grfx.BACK), 0, 0);
        ctx.fillStyle = "#000";
		ctx.textAlign = "center";
		ctx.font = "20px 'Press Start 2P'"; 
		ctx.fillText("PRESS RETURN", Options.WIDTH >> 1, Options.HEIGHT * .46);
        ctx.fillText("TO PLAY", Options.WIDTH >> 1, Options.HEIGHT * .52);
		ctx.font = "16px 'Press Start 2P'"; 
        ctx.fillText(`HI-SCORE: ${this.hiscore}`, Options.WIDTH >> 1, Options.HEIGHT * .2);

    }

    start() {
        this.hiscore = localStorage.getItem('fatfrog_panic') || 0;
        K.clear();
        K.addKey(13, (e) => {
            window.dispatchEvent(new CustomEvent("stateChange", {
                detail: {
                    state: Options.GAME
                }
            }));
        });
    }
}