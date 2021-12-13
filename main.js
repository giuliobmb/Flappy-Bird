const canvas = document.getElementById('cv');
const ctx = canvas.getContext('2d');

export { ctx };

import { Sprite } from './modules/classes.js';

const sprites = new Image();
sprites.src = 'SPRITES.png';


//ctx.drawImage(sprites, 100, 100);

const background = new Sprite(sprites, 0, 0, 130, 900);


let dX=0
let dY=0;
let dW=320;
let dH=560;

function gameloop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    dX--;
    
    background.draw(dX, dY, dW, dH);
    background.draw(dX+dW, dY, dW, dH);

    if(dX<dW*-1)
        dX = 0;

    
    
    requestAnimationFrame(gameloop);
}

gameloop();