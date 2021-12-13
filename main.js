const canvas = document.getElementById('cv');
const ctx = canvas.getContext('2d');

export { ctx };

import { Sprite, Game, Entity, Vector } from './modules/classes.js';

const sprites = new Image();
sprites.src = 'SPRITES.png';


const elements = {
    background: {
        vAs: new Vector(0, 0),
        vDs: new Vector(130, 900),
        vAd: new Vector(0, -6),
        vDd: new Vector(320, 560)
    },
    terrain: {
        vAs: new Vector(150, 2),
        vDs: new Vector(150, 50),
        vAd: new Vector(0, 118),
        vDd: new Vector(320, 40)
    },
    logo: {
        vAs: new Vector(0, 0),
        vDs: new Vector(130, 900)
    },
    bird: {
        vAs: new Vector(0, 0),
        vDs: new Vector(130, 900)
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