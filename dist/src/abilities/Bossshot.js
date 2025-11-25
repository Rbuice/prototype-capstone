
export class Bossshot extends Phaser.GameObjects.Image{
            #target;
            #scene;
            #shotact;
            constructor(scene){
                super(scene, 0, 0, 'shot');
                this.#scene = scene;
                this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
                this.#shotact = false;
            }

            fire(x, y, player){
                this.setActive(true);
                this.setVisible(true);
                this.setPosition(x, y);
                this.#target = player.body;
                this.#scene.physics.moveTo(this, player.body.x, player.body.y, 500)
                this.#shotact = true;
            }
            update (time , delta){
                
                if(this.#shotact){
                    const tolerance = 10;
                    const distance = Phaser.Math.Distance.BetweenPoints(this.body, this.#target);
                    if(distance < tolerance){
                        this.setActive(false);
                        this.setVisible(false);
                        this.#shotact = false;
                        this.destroy(true);
                        
                    }
                }
                
            }
}