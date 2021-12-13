import { ctx } from '../main.js';

class Sprite{
    constructor(image, sX, sY, sW, sH){
        this.image = image;
        this.sX = sX;
        this.sY = sY;
        this.sW = sW;
        this.sH = sH;
    }
    draw(dX, dY, dW, dH){
        ctx.drawImage(this.image, this.sX, this.sY, this.sW, this.sH, dX, dY, dW, dH);
    }
}

export { Sprite };