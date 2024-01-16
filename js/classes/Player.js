import {Entity} from "./Entity.js";

export class Player extends Entity {
    constructor(...props) {
        super(...props);

        this.moveX = 0;
        this.isJumping = false;
    }

    setMove() {
        window.addEventListener('keydown', (evt) => {
            switch (evt.keyCode) {
                case 87:
                    if (!this.isJumping) {
                        this.gravity = -15
                    }
                    this.isJumping = true;
                    break;
                case 68:
                    this.moveX = this.moveSpeed;
                    break;
                case 83:
                    break;
                case 65:
                    this.moveX = -this.moveSpeed;
                    break;
            }
        })
        window.addEventListener('keyup', (evt) => {
            switch (evt.keyCode) {
                case 68:
                    this.moveX = 0;
                    break;
                case 65:
                    this.moveX = 0;
                    break;
            }
        })
        if (this.gravity === 0) {
            this.isJumping = false;
        }
        if (this.position.x < this.border.minWidth) {
            this.position.x = this.border.minWidth;
        } else if (this.position.x > this.border.maxWidth - this.width) {
            this.position.x = this.border.maxWidth - this.width
        } else {
            this.position.x += this.moveX;
        }
    }

    checkCollision() {
        this.gameObjects.forEach(object => {
            if (
                this.position.x + this.width >= object.position.x
                && this.position.y + this.height >= object.position.y
                && this.position.x <= object.position.x + object.width
                && this.position.y <= object.position.y + object.height
            ) {
                if (this.gravity > 0) {
                    this.gravity = 0;
                    this.isJumping = false;
                    this.position.y = object.position.y - this.height - 0.01
                    return
                }
                if (this.gravity < 0) {
                    this.gravity = 0;
                    this.position.y = object.position.y + object.height + 0.01
                }
            }
        })
    }

    update() {
        super.update();
        this.checkCollision()
        this.setMove()
    }
}