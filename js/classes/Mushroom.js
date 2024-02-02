import {Entity} from "./Entity.js";

export class Mushroom extends Entity {
    constructor(...props) {
        super(...props);
        this.moveSpeed = 1;
        this.moveX = 1;
        this.name = 'mushroom';
        this.canCollided = false;

        this.width = 64;
        this.height = 64;
        this.position = {
            x: Math.floor(Math.random() * (Math.floor(window.innerWidth / 64) - 1) + 3) * 64,
            y: (window.innerHeight - 4) - (Math.floor(Math.random() * 11) + 4) * 64
        };
        this.name = 'mushroom'
        this.style = 'red';
    }

    enemyMove() {
        this.gameObjects.bricks.forEach(object => {

        })
    }

    update() {
        super.update();
        this.enemyMove()
    }
}
