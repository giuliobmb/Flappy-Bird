import { ctx } from '../main.js';

class Sprite{
    constructor(image, vAs, vDs){
        this.image = image;
        this.vAs = vAs;
        this.vDs = vDs;
    }
    draw(vAd, vDd){
        ctx.drawImage(this.image, this.vAs.x, this.vAs.y, this.vDs.x, this.vDs.y, vAd.x, vAd.y, vDd.x, vDd.y);
    }
}

class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    sum(vector){
        return new Vector(this.x += vector.x, this.y += vector.y);
    }
    sub(vector){
        return new Vector(this.x -= vector.x, this.y -= vector.y);
    }
    compare(vector){
        let sV = this.sub(vector);
        if(sV.x > 0 && sV.y > 0)
            return true;
        else
            return false;
    }
}

class Entity{
    constructor(element){
        this.element;
        this.vAd;
        this.vDd;
    }
    set(vAd, vDd){
        this.vAd = vAd;
        this.vDd = vDd;
        draw(vAd, vDd);
    }
    collision(entity){
        if(entity.vAd.sum(entity.vD))
    }

}

class Game{
    constructor(elements, sprites){
        this.elements = elements;
        this.sprites = sprites;
        this.mode;   
    }
    setup(){
        this.elements.background = new Sprite(this.sprites, new Vector(0, 0), new Vector(130, 900));
        this.elements.terrain = new Sprite(this.sprites, new Vector(150, 2), new Vector(150, 50));
        
    }
    setMode(mode){
        switch(mode){
            case 0:
                this.start();
                break;
            case 1:
                break;
        }
    }

    start(){
        this.elements.background.draw(new Vector(0, -6), new Vector(320, 560));
        this.elements.terrain.draw(new Vector(0, 118), new Vector(320, 40));
    }


}

export { Sprite, Game };