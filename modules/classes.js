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


class Game{
    constructor(elements){
        this.elements = elements;
        this.mode;
    }
    setup(){
        const background = new Sprite(this.elements, 0, 0, 130, 900);
        background.draw(0, -6, 320, 560);
        const terrain = new Sprite(this.elements, 150, 2, 150, 50);
        terrain.draw(0, 118, 320, 40);
        
    }
    setMode(mode){

    }


}

export { Sprite, Game};