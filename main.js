const canvas = document.getElementById('cv');
const ctx = canvas.getContext('2d');

export { ctx };

import { Sprite, Game } from './modules/classes.js';

const sprites = new Image();
sprites.src = 'SPRITES.png';


const elements = {
    background: null,
    terrain: null,
    logo: null,
    bird: null,
    getReady: null
}


let game = new Game(elements, sprites);








function gameloop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.setup();
    game.setMode(0);
    
    requestAnimationFrame(gameloop);
}

gameloop();