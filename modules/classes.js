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
        if(sV.x > 0 && sV.y > 0)
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
        this.coloumnSpeed = 3;
        this.c0Distance = Math.random()*200 + 120;
        this.c1Distance = Math.random()*200 + 120;
        this.dVAdU = this.elements.coloumns[0].vAd;//duplicate vector axis up coloumns
        this.dVAdD = this.elements.coloumns[1].vAd;//duplicate vector axis down coloumns
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
                this.mode = 0;
                this.stop();
                break;
            case 1:
                this.mode = 1;
                this.start();
                break;
        }
    }

    handleJump(){
        if(this.mode != 0){
            if(this.jumping == true || this.jumped < 6 && this.jumped > 0){
                this.elements.bird.vAd.y -= 4;
                this.jumped += 0.3;
            }else{
                this.jumped = 0;
            }
        }
        
    }

    start(){
        //position 0 entities
        this.elements.background.entity.set(this.elements.background.vAd, this.elements.background.vDd);
        this.elements.bird.entity.set(this.elements.bird.vAd, new Vector(25,25));
        
        
        
        //coloumns 

        this.elements.coloumns[0].entity.set(this.elements.coloumns[0].vAd, this.elements.coloumns[0].vDd);
        this.elements.coloumns[1].entity.set(this.elements.coloumns[1].vAd, this.elements.coloumns[1].vDd);
        
        this.elements.coloumns[0].vAd.x-= this.coloumnSpeed;
        this.elements.coloumns[1].vAd.x-= this.coloumnSpeed;
        
        if(this.elements.coloumns[0].vAd.x < -60){
            this.elements.coloumns[0].vAd.x = 320;
            this.elements.coloumns[1].vAd.x = 320;
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

        //collisions
        if(this.elements.bird.entity.collision(this.elements.coloumns[0].entity) || this.elements.bird.entity.collision(this.elements.coloumns[1].entity)){
            this.setMode(0);
        }
    }

    stop(){
        if(this.mode == 0){
            this.elements.terrain.vAd.x += 0.6;
            this.elements.coloumns[0].vAd.x+= this.coloumnSpeed;
            this.elements.coloumns[1].vAd.x+= this.coloumnSpeed;
            this.elements.bird.vAd.y -= this.birdSpeed;
            this.elements.bird.entity.set(this.elements.bird.vAd, new Vector(25,25));
        }
    }

    reset(){
        this.elements.bird ={
            vAs: new Vector(223, 122),
            vDs: new Vector(17, 17),
            vAd: new Vector(148.5, 240)
        }; 
        this.elements.coloumns = [
            {
                vAs: new Vector(302, 1),
                vDs: new Vector(26, 136),
                vAd: new Vector(390, 0),
                vDd: new Vector(60, 180)
            },
            {
                vAs: new Vector(330, 0),
                vDs: new Vector(26, 136),
                vAd: new Vector(390, 240),
                vDd: new Vector(60, 170)
            }
        ];
        this.setup();
    }

    


}

export { Sprite, Game, Entity, Vector };