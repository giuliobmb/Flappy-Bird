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
    divide(number){
        let x = this.x;
        let y = this.y;
        return new Vector(x / number, y / number);
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
        this.birdSpeed = 2.3;
        this.jumping = false;
        this.jumped = 0;
        this.coloumnSpeed = -3;
        this.cDistance = Math.random()*300 + 100;
    }
    setup(){
        this.elements.background.entity = new Entity(new Sprite(this.sprites, this.elements.background.vAs, this.elements.background.vDs));
        this.elements.terrain.entity = new Entity(new Sprite(this.sprites, this.elements.terrain.vAs, this.elements.terrain.vDs));
        this.elements.bird.entity = new Entity(new Sprite(this.sprites, this.elements.bird.vAs, this.elements.bird.vDs));
        this.elements.coloumns[0].entity =  new Entity(new Sprite(this.sprites, this.elements.coloumns[0].vAs, this.elements.coloumns[0].vDs));
        this.elements.coloumns[1].entity =  new Entity(new Sprite(this.sprites, this.elements.coloumns[1].vAs, this.elements.coloumns[1].vDs));
        
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

    handleJump(){
        if(this.jumping == true || this.jumped < 6 && this.jumped > 0){
            this.elements.bird.vAd.y -= 4;
            this.jumped += 0.3;
        }else{
            this.jumped = 0;
        }
    }

    start(){
        //position 0 entities
        this.elements.background.entity.set(this.elements.background.vAd, this.elements.background.vDd);
        this.elements.bird.entity.set(this.elements.bird.vAd, new Vector(25,25));
        
        
        
        //coloumns 
        let dColoumns = [this.elements.coloumns[0].entity.copy(), this.elements.coloumns[1].entity.copy()];

        this.elements.coloumns[0].entity.set(this.elements.coloumns[0].vAd.sub(new Vector(this.coloumnSpeed, 0)), this.elements.coloumns[0].vDd);
        this.elements.coloumns[1].entity.set(this.elements.coloumns[1].vAd.sub(new Vector(this.coloumnSpeed, 0)), this.elements.coloumns[1].vDd);

        dColoumns[0].set(this.elements.coloumns[0].vAd.sum(new Vector(this.coloumnSpeed+this.cDistance, 0)), this.elements.coloumns[0].vDd);
        dColoumns[1].set(this.elements.coloumns[1].vAd.sum(new Vector(this.coloumnSpeed+this.cDistance, 0)), this.elements.coloumns[1].vDd);

        if(this.elements.coloumns[0].x < 0){
            this.elements.coloumns[0].x = 320;
            this.elements.coloumns[1].x = 320;
            this.coloumnSpeed = 30;
        }


        
        //moving terrain
        this.elements.terrain.entity.set(this.elements.terrain.vAd, this.elements.terrain.vDd);
        let dTerrain = this.elements.terrain.entity.copy();
        dTerrain.set(this.elements.terrain.vAd.sum(new Vector(314, 0)), this.elements.terrain.vDd);
        this.elements.terrain.vAd.x -= 0.6;
        if(this.elements.terrain.vAd.sum(new Vector(314, 0)).x < 0)
            this.elements.terrain.vAd.x = 0
        

        


        
        //bird fall
        this.elements.bird.vAd.y += this.birdSpeed;
        if(this.elements.bird.vAd.y > this.elements.terrain.vAd.y-20)
        this.elements.bird.vAd.y = this.elements.terrain.vAd.y-20;


        //bird jump
        this.handleJump();


    }


}

export { Sprite, Game, Entity, Vector };