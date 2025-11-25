
export class Shot extends Phaser.GameObjects.Image{
            #speed
            #dirc
            #playerx
            constructor(scene){
                super(scene, 0, 0, 'shot');
                this.#speed = Phaser.Math.GetSpeed(500, 1);
                this.#dirc = -1;
                this.#playerx;
                this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
            }

            fire (x,y,dir){
                if(dir=== -1){
                    this.#playerx = x;
                    this.#dirc = dir;
                    this.setPosition(x-20, y);
                    this.setActive(true);
                    this.setVisible(true);
                } else {
                    this.#playerx = x;
                    this.#dirc = dir;
                    this.setPosition(x+20, y);
                    this.setActive(true);
                    this.setVisible(true);
                }
                
            }
            update (time , delta){
                if(this.#dirc === -1){
                    this.x -= this.#speed * delta;
                } else {
                    this.x += this.#speed * delta;
                }
                

                if(this.x < this.#playerx - 200 || this.x > this.#playerx + 200){
                    this.setActive(false);
                    this.setVisible(false);
                    this.destroy(true);
                }

            }
}