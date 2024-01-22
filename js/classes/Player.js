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
    }

    update() {
        super.update();
        this.setMove()
        this.checkWindowCollision()
    }
}