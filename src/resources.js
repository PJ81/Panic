

class Resources {
    constructor(cb) {
        this.images = new Array(25);
        
        Promise.all([
            (loadImage("./img/back.png")).then((i) => {this.images[Grfx.BACK] = i;}),
            (loadImage("./img/a0.png")).then((i) => {this.images[Grfx.A0] = i;}),
            (loadImage("./img/a1.png")).then((i) => {this.images[Grfx.A1] = i;}),
            (loadImage("./img/a2.png")).then((i) => {this.images[Grfx.A2] = i;}),
            (loadImage("./img/bullet.png")).then((i) => {this.images[Grfx.BULLET] = i;}),
            (loadImage("./img/ship.png")).then((i) => {this.images[Grfx.SHIP] = i;}),
            (loadImage("./img/part.png")).then((i) => {this.images[Grfx.PARTICLE] = i;}),
            (loadImage("./img/moon.png")).then((i) => {this.images[Grfx.MOON] = i;})
        ]).then(() => {
            cb();
        });
    }
    
    image(index) {
        if(index < this.images.length) {
            return this.images[index];
        }
        return null;
    }
}