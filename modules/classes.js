import { ctx } from '../main.js';

const testSprite = new Image();
testSprite.src = 'img.png';

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
        let x = this.x;
        let y = this.y;
        return new Vector(x += vector.x, y += vector.y);
    }
    sub(vector){
        let x = this.x;
        let y = this.y;
        return new Vector(x -= vector.x, y -= vector.y);
    }
    compare(vector){
        let sV = this.sub(vector);
        if(sV.x >= 0 && sV.y >= 0)
            return true;
        else
            return false;
    }
}

class Entity{
    constructor(element){
        this.element = element;
        this.vAd;
        this.vDd;
    }
    set(vAd, vDd){
        this.vAd = vAd;
        this.vDd = vDd;
        this.element.draw(vAd, vDd);
    }
    collision(entity){
        if(entity.vAd.sum(entity.vDd).compare(this.vAd) && this.vAd.sum(this.vDd).compare(entity.vAd))
            return true;
        else
            return false;
    }
    copy(){
        return new Entity(this.element);
    }

}

class Game{
    constructor(elements, sprites){
        this.elements = elements;
        this.sprites = sprites;
        this.mode;
    }
    setup(){
        this.elements.background.entity = new Entity(new Sprite(this.sprites, this.elements.background.vAs, this.elements.background.vDs));
        this.elements.terrain.entity = new Entity(new Sprite(this.sprites, this.elements.terrain.vAs, this.elements.terrain.vDs));

        this.elements.block1 = new Entity(new Sprite(testSprite, new Vector(10, 10), new Vector(10, 10)));
        this.elements.block2 = new Entity(new Sprite(testSprite, new Vector(10, 10), new Vector(10, 10)));
        
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
        
        this.elements.background.entity.set(this.elements.background.vAd, this.elements.background.vDd);
        this.elements.terrain.entity.set(this.elements.terrain.vAd, this.elements.terrain.vDd);

        let dTerrain = this.elements.terrain.entity.copy();

        dTerrain.set(this.elements.terrain.vAd.sum(new Vector(314, 0)), this.elements.terrain.vDd);
        
        this.elements.terrain.vAd.x--;

        if(this.elements.terrain.vAd.sum(new Vector(314, 0)).x < 0)
            this.elements.terrain.vAd.x = 0

        
        //this.elements.block1.set(new Vector(10, 10), new Vector(25, 25));
        //this.elements.block2.set(new Vector(35, 35), new Vector(25, 25));
        //console.log(this.elements.block1.collision(this.elements.block2));

    }


}

export { Sprite, Game, Entity, Vector };