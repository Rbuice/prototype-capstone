
import {Shot} from '../abilities/Shot.js';
export class Player extends Phaser.GameObjects.Container{
    #playersprite;
    #moveinput;
    #damaged
    #lastdamage
    #playermax;
    #playerhp;
    #lastFired;
    #playdirection;
    #shots;
    #currtime;
    constructor(scene, x, y){
        super(scene,  x,  y, []);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setSize(32,32);
        this.body.setOffset(-16,-16);
        this.body.setGravityY(500);
        this.#playersprite = scene.add.sprite(0, 0, 'player', 0);
        this.add([this.#playersprite]);
        this.#moveinput = scene.input.keyboard.createCursorKeys();
        this.#playermax = 3;
        this.#playerhp = this.#playermax;
        this.#playdirection = -1;
        this.#lastdamage = false;
        this.#lastFired = 0;
        this.#currtime = 0;
        this.#shots = scene.physics.add.group({
            classType: Shot,
            maxSize: 5,
            runChildUpdate: true,
            allowGravity: false
        });
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.once(Phaser.GameObjects.Events.DESTROY, () => {
            this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
        })
    }
    getDamaged(){
        return this.#damaged;
    }
    damage(){
        this.#damaged = true;
        this.#lastdamage = this.#currtime + 500;
        this.#playerhp = this.#playerhp - 1;
        this.body.setVelocityX(-160);
        this.body.setVelocityY(-360);
    }
    getShots(){
        return this.#shots;
    }
    getDir(){
        return this.#playdirection;
    }
    setHp(newhp){
        this.#playerhp = newhp;
    }
    getHp(){
        return this.#playerhp;
    }
    update(time, delta){
        const {left, right, up, space} = this.#moveinput;
        if(left.isDown){
            this.body.setVelocityX(-360);
            this.#playdirection = -1;
        }
        else if(right.isDown){
            this.body.setVelocityX(360);
            this.#playdirection = 1;
        }
        else if(this.#damaged === false) {
            this.body.setVelocityX(0);
        }
        if(time > this.#lastdamage){
            this.#damaged = false;
        }
        if(this.#playerhp <= 0){
            this.body.destroy(true);
            this.destroy(true);
        }
        if (up.isDown && this.body.touching.down){
            this.body.setVelocityY(-360);
        }
        if(space.isDown && time > this.#lastFired){
            const shot = this.#shots.get();

            if(shot){
                shot.fire(this.x, this.y, this.#playdirection);
                this.#lastFired = time + 100;
            }
        }
        this.#currtime = time;
    }
}