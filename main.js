const canvas = document.getElementById('cv');
const ctx = canvas.getContext('2d');

export { ctx };

import { Sprite } from './modules/classes.js';

const sprites = new Image();
sprites.src = 'SPRITES.png';



ctx.drawImage(sprites, 100, 100);

const background = new Sprite(sprites, 0, 0, 15, 15);

background.draw(0, 0, 15, 15);

