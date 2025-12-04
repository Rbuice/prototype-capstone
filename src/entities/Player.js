
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
        super(scene,  x,  y-10, []);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setSize(32,48);
        this.body.setOffset(-16,-24);
        this.body.setGravityY(500);
        this.#playersprite = scene.add.sprite(0, 0, 'dude', 0);
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'leftlook',
            frames: [ { key: 'dude', frame: 0 } ],
            frameRate: 20
        });
        this.scene.anims.create({
            key: 'rightlook',
            frames: [ { key: 'dude', frame: 5 } ],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
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
        if(this.#playerhp <= 0){
            return true;
        } else {
            return false;
        }
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
            this.#playersprite.anims.play('left', true);
        }
        else if(right.isDown){
            this.body.setVelocityX(360);
            this.#playdirection = 1;
            this.#playersprite.anims.play('right', true);
        }
        else if(this.#damaged === false) {
            this.body.setVelocityX(0);
            if(this.#playdirection === -1){
                this.#playersprite.anims.play('leftlook');
            } else {
                this.#playersprite.anims.play('rightlook');
            }
            
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