
import {Player} from '../entities/Player.js';
export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }
    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('rooftop', 'assets/rooftop.png');
        this.load.image('frog', 'assets/frog.png');
        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.image('player', 'assets/Square.png');
        this.load.image('shot', 'assets/bomb.png');
        this.load.image('boss', 'assets/Boss.png');
        this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
    }
    
    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'sky');
        const rooftop = this.physics.add.staticGroup();
        rooftop.create(600, 660, 'rooftop').setScale(4).refreshBody();
        const player = new Player(this, 15, 720 -140);
        this.player = player;
        this.physics.add.collider(player, rooftop);
        this.changezone = this.add.zone(1200, 100, 32, 500).setOrigin(0);
        this.physics.world.enable(this.changezone, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.add.overlap(player, this.changezone, this.onZoneOverlap, null, this);
    }
    onZoneOverlap(player, zone) {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('Rightone', {currhp: this.player.getHp()});
    });
    }
    update(time, delta){
        
    }
    
    
}


