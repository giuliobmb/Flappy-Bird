const canvas = document.getElementById('cv');
const ctx = canvas.getContext('2d');

export { ctx };

import { Sprite, Game } from './modules/classes.js';

const sprites = new Image();
sprites.src = 'SPRITES.png';



let game = new Game(sprites)








function gameloop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.setup();
    
    requestAnimationFrame(gameloop);
}

gameloop();