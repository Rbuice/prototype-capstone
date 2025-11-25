
// "Every great game begins with a single scene. Let's make this one unforgettable!"
import {Player} from '../entities/Player.js';
import {Boss} from '../entities/Boss.js';
export class Lefttwo extends Phaser.Scene {
    constructor() {
        super('Lefttwo');
    }

    init(data) {
       this.currhp = data.currhp;
    }

    preload() {
        // Load assets
        this.load.image('sky', 'assets/sky.png');
        this.load.image('rooftop', 'assets/rooftop.png');
        this.load.image('frog', 'assets/frog.png');
        this.load.image('player', 'assets/Square.png');
        this.load.image('shot', 'assets/bomb.png');
        this.load.image('boss', 'assets/Boss.png');
    }

    create() {
        // Create game objects
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'sky');
        const rooftop = this.physics.add.staticGroup();
        const player = new Player(this, 1240, 720-140);
        player.setHp(this.currhp);
        this.player = player;
        this.physics.add.collider(player, rooftop);
        rooftop.create(600, 660, 'rooftop').setScale(4).refreshBody();
        const boss = new Boss(this, player);
        this.physics.add.collider(boss, rooftop);
        this.physics.add.overlap(boss, player.getShots(), (frogGameObject, shotGameObject) => {
            frogGameObject.damage(1);
            shotGameObject.destroy(true);
        });
        this.physics.add.overlap(player, boss, (playerGameObject, frogGameObject) => {
            if(player.getDamaged()){

            } else {
                playerGameObject.damage();
            }
           
        });
        this.physics.add.overlap(player, boss.getShots(), (playerGameObject, frogGameObject) => {
            if(player.getDamaged()){

            } else {
                playerGameObject.damage();
            }
           
        });
    }

}
