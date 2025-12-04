
import {Frog} from '../entities/Frog.js';
import {Player} from '../entities/Player.js';
export class Righttwo extends Phaser.Scene {
    constructor() {
        super('Righttwo');
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
        this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
    }

    create() {
        // Create game objects
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'sky');
        const rooftop = this.physics.add.staticGroup();
        const player = new Player(this, 15, 720 -140);
        player.setHp(this.currhp);
        this.player = player;
        this.physics.add.collider(player, rooftop);
        rooftop.create(600, 660, 'rooftop').setScale(4).refreshBody();
        rooftop.create(1200, 560, 'rooftop').setScale(1).refreshBody();
        rooftop.create(1200, 460, 'rooftop').setScale(1).refreshBody();
        rooftop.create(1200, 360, 'rooftop').setScale(1).refreshBody();
        rooftop.create(1200, 260, 'rooftop').setScale(1).refreshBody();
        rooftop.create(1200, 160, 'rooftop').setScale(1).refreshBody();
        rooftop.create(1200, 60, 'rooftop').setScale(1).refreshBody();
        this.changezone = this.add.zone(900, 0, 500, 32).setOrigin(0);
        this.physics.world.enable(this.changezone, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.add.overlap(player, this.changezone, this.onZoneOverlap, null, this);
        this.physics.add.collider(player, rooftop);
        const frog1 = new Frog(this, 700, 720 -140, 1);
        const frog2 = new Frog(this, 900, 720 -140, 1);
        const frog3 = new Frog(this, 1000, 320 -140, 1);
        const frogs = this.add.group([frog1, frog2, frog3]);
        this.physics.add.collider(frogs, rooftop);
        this.physics.add.overlap(frogs, player.getShots(), (frogGameObject, shotGameObject) => {
            frogGameObject.damage(1);
            shotGameObject.destroy(true);
        });
        this.physics.add.overlap(player, frogs, (playerGameObject, frogGameObject) => {
            if(player.getDamaged()){

            } else {
               this.dead = playerGameObject.damage();
            }
           
        });
    }
    onZoneOverlap(player, zone) {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('Upone', {currhp: this.player.getHp()});
    });
    }
    update(){
        if(this.dead){
            this.scene.start('Gameover');
        }
    }
}