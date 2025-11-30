// "Every great game begins with a single scene. Let's make this one unforgettable!"
export class Gameover extends Phaser.Scene {
    constructor() {
        super('Gameover');
    }

    init() {
        // Initialize scene
    }

     preload() {
        // Load assets
        this.load.image('sky', 'assets/sky.png');
    }

    create() {
        // Create game objects
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'sky').setInteractive();
        const text = this.add.text(this.scale.width / 2, this.scale.height /2, 'You are Dead', { fontSize: '16px', fill: '#FFF' });
        this.background.on('pointerdown', () =>{
            this.scene.start('Menu');
        });
    }

}
