import {Entity} from "./Entity.js";

export class Mushroom extends Entity{
    constructor(...props) {
        super(...props);
        this.moveSpeed = 1;
        this.moveX = 1;
        this.name = 'mushroom';
    }

    enemyMove() {
        this.gameObjects.forEach(object => {
            if (this.position.y + this.height <= object.position.y) {
                if (this.position.x <= object.position.x) {
                    this.moveX = this.moveSpeed;
                    return
                }
                if (this.position.x + this.width === object.position.x + object.width) {
                    this.moveX = -this.moveSpeed;
                }
            }
        })
    }

    checkWindowCollision() {
        if (this.position.x <= this.border.minWidth) {
            this.moveX = -this.moveSpeed;
        } else if (this.position.x >= this.border.maxWidth - this.width) {
            this.moveX = this.moveSpeed;
        } else {
            this.position.x += this.moveX;
        }
    }

    update() {
        super.update();
        this.checkWindowCollision()
        this.enemyMove()
    }
}