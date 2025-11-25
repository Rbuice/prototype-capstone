import { Start } from './scenes/Start.js';
import { Rightone} from './scenes/rightone.js';
import { Righttwo} from './scenes/righttwo.js';
import {Upone} from './scenes/upone.js';
import {Leftone} from './scenes/leftone.js';
import {Lefttwo} from './scenes/lefttwo.js';
const config = {
    type: Phaser.AUTO,
    title: 'Prototype Last Bastion',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 100},
            debug: true
        }
    },
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        Start,
        Rightone,
        Righttwo,
        Upone,
        Leftone,
        Lefttwo
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            