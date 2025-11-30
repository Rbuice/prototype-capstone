
import {Bossshot} from '../abilities/Bossshot.js';
export class Boss extends Phaser.GameObjects.Container {
    #bosssprite;
    #lastAtt;
    #enemypos;
    #positions;
    #stagepos;
    #bossmax;
    #bosshp;
    #player;
    #scene;
    #previousatt;
    #dir;
    #shots;
    constructor(scene, player){
        super(scene, 50, scene.scale.height -155, []);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setSize(32,64);
        this.body.setOffset(-16,-32);
        this.body.setGravityY(500);
        this.#bosssprite = scene.add.sprite(0,0, 'boss', 0);
        this.add([this.#bosssprite]);
        this.#bossmax = 5;
        this.#bosshp = this.#bossmax;
        this.#player = player;
        this.#scene = this.scene;
        this.#enemypos = this.body.x;
        this.#dir = false;
        this.#positions = {
            "3": 50,
            "2": 600,
            "1": 1200
        };
        this.#lastAtt = 100;
        this.#stagepos = "3";
        this.#shots = scene.physics.add.group({
            classType: Bossshot,
            maxSize: 5,
            runChildUpdate: true,
            allowGravity: false
        });
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.once(Phaser.GameObjects.Events.DESTROY, () => {
            this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
        })
    }
    attack(){
        let att = Math.floor(Math.random() * 3 + 1);
        if(att === 1) {
            this.#enemypos = this.body.x;
            if(this.#player.body.x < this.body.x){
                this.body.setVelocityY(-560);
                this.body.setVelocityX(-260);
                this.#dir = false;
            } else if(this.#player.body.x > this.body.x) {
                this.body.setVelocityY(-560);
                this.body.setVelocityX(260);
                this.#dir = true;
            }
            
        } else if(att === 2){
            if(this.#stagepos === "1"){
                this.#scene.physics.moveTo(this, this.#positions["3"], this.#scene.scale.height -155, 1000);
                this.#stagepos = "3";
            } else if (this.#stagepos === "3"){
                this.#scene.physics.moveTo(this, this.#positions["1"], this.#scene.scale.height -155, 1000);
                this.#stagepos = "1";
            } else {
                let pos = Math.floor(Math.random() * 2);
                if(pos === 0){
                    this.#scene.physics.moveTo(this, this.#positions["3"], this.#scene.scale.height -155, 1000);
                    this.#stagepos = "3";
                } else {
                    this.#scene.physics.moveTo(this, this.#positions["1"], this.#scene.scale.height -155, 1000);
                    this.#stagepos = "1";
                }
            } 
            
        }else {
            const shot = this.#shots.get();
            if(shot){
                this.body.setVelocityY(-500);
                shot.fire(this.body.x, this.body.y, this.#player);
            }
            
        }
        this.#previousatt = att;
    }
    damage(dam){
        this.#bosshp = this.#bosshp - dam;
        if(this.#bosshp <= 0){
            return true;
        } else {
            return false;
        }
    }
    getShots(){
        return this.#shots;
    }
    update(time, delta){
        if(time > this.#lastAtt){
            this.attack();
            this.#lastAtt = time + 2500;
        }
        if(this.#previousatt === 2){
            const left = this.body.velocity.x < 0;
            const right = this.body.velocity.x > 0;
            if(right && this.body.x >= this.#positions[this.#stagepos] || left && this.body.x <= this.#positions[this.#stagepos]){
                this.body.setVelocity(0);
            }
        } else if(this.#previousatt === 1){
            if(this.body.x < this.#enemypos - 250 && this.#dir === false){
                this.body.setVelocityX(0);
            } else if(this.body.x > this.#enemypos + 250 && this.#dir === true) {
                this.body.setVelocityX(0);
            }
        }
        if(this.#bosshp <= 0){
            this.destroy(true);
            
        }
    }

}