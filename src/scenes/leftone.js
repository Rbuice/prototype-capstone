
import {Frog} from '../entities/Frog.js';
import {Player} from '../entities/Player.js';
export class Leftone extends Phaser.Scene {
    constructor() {
        super('Leftone');
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
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'sky');
        const rooftop = this.physics.add.staticGroup();
        const player = new Player(this, 1240, 720-140);
        player.setHp(this.currhp);
        this.player = player;
        this.physics.add.collider(player, rooftop);
        rooftop.create(600, 660, 'rooftop').setScale(4).refreshBody();
        rooftop.create(500, 550, 'rooftop').setScale(3).refreshBody();
        rooftop.create(350, 480, 'rooftop').setScale(2).refreshBody();
        rooftop.create(200, 440, 'rooftop').setScale(1).refreshBody();
        const frog = new Frog(this, this.scale.width / 2, 300, -1);
        this.physics.add.collider(frog, rooftop);
        this.physics.add.overlap(frog, player.getShots(), (frogGameObject, shotGameObject) => {
            frogGameObject.damage(1);
            shotGameObject.destroy(true);
        });
        this.physics.add.overlap(player, frog, (playerGameObject, frogGameObject) => {
            if(player.getDamaged()){

            } else {
                playerGameObject.damage();
            }
           
        });
        this.changezone = this.add.zone(10, 100, 32, 500).setOrigin(0);
        this.physics.world.enable(this.changezone, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.add.overlap(player, this.changezone, this.onZoneOverlap, null, this);
    }
    onZoneOverlap(player, zone) {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('Lefttwo', {currhp: this.player.getHp()});
    });
    } 
}
