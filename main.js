const canvas = document.getElementById('cv');
const ctx = canvas.getContext('2d');

export { ctx };

import { Sprite } from './modules/classes.js';

const sprites = new Image();
sprites.src = 'SPRITES.png';


//ctx.drawImage(sprites, 100, 100);

const background = new Sprite(sprites, 0, 0, 153, 957);




function gameloop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    background.draw(0, 0, dW, dH);
    
    window.requestAnimationFrame(gameloop);
}

gameloop();