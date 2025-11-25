
export class Frog extends Phaser.GameObjects.Container {
    #frogsprite;
    #lastMoved;
    #enemypos;
    #frogmax;
    #froghp;
    #dir;
    constructor(scene, x, y, dir){
        super(scene, x, y, []);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setSize(32,32);
        this.body.setOffset(-16,-16);
        this.body.setGravityY(500);
        this.#frogsprite = scene.add.sprite(0,0, 'frog', 0);
        this.add([this.#frogsprite]);
        this.#enemypos;
        this.#dir = dir;
        this.#lastMoved = 0;
        this.#frogmax = 3;
        this.#froghp = this.#frogmax;
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.once(Phaser.GameObjects.Events.DESTROY, () => {
            this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
        })
        
    }
    update(time, delta){
        if(time > this.#lastMoved){
            if(this.#dir === 1){
                this.#enemypos = this.body.x;
                this.body.setVelocityY(-260);
                this.body.setVelocityX(-200);
                this.#lastMoved = time + 2500;
            } else {
                this.#enemypos = this.body.x;
                this.body.setVelocityY(-260);
                this.body.setVelocityX(200);
                this.#lastMoved = time + 2500;
            }
            
        }
        if(this.body.x < this.#enemypos - 150 && this.#dir === 1){
            this.body.setVelocityX(0);
        } else if (this.body.x > this.#enemypos + 150 && this.#dir === -1) {
            this.body.setVelocityX(0);
        }
        if(this.#froghp <= 0){
            this.destroy(true);
        }
    }
    damage(dam){
        this.#froghp = this.#froghp - dam;
    }
}