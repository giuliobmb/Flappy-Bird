const canvas = document.getElementById('cv');
const ctx = canvas.getContext('2d');

export { ctx };

import { Sprite, Game, Entity, Vector } from './modules/classes.js';

const sprites = new Image();
sprites.src = 'SPRITES.png';


const elements = {
    background: {
        vAs: new Vector(0, 0),
        vDs: new Vector(143, 255),
        vAd: new Vector(0, -60),
        vDd: new Vector(320, 560)
    },
    terrain: {
        vAs: new Vector(150, 1),
        vDs: new Vector(143, 55),
        vAd: new Vector(0, 380),
        vDd: new Vector(320, 100)
    },
    logo: {
        vAs: new Vector(0, 0),
        vDs: new Vector(130, 900)
    },
    bird: {
        vAs: new Vector(223, 122),
        vDs: new Vector(17, 17)
    },
    getReady: {
        vAs: new Vector(0, 0),
        vDs: new Vector(130, 900)
    },
}


let game = new Game(elements, sprites);


function gameloop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.setup();
    game.setMode(0);
    
    requestAnimationFrame(gameloop);
}

gameloop();