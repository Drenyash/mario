import {Entity} from "./Entity.js";

export class Player extends Entity {
    constructor(...props) {
        super(...props);

        this.width = 4 * this.sizeMultiplier - 0.01;
        this.height = 4 * this.sizeMultiplier- 0.01;
        this.position = {
            x: 10,
            y: window.innerHeight - (this.height * 2) + 2
        };
        this.style = 'blue';
        this.moveX = 0;
        this.isJumping = false;
        this.canCollided = true;
        this.isSit = false;
        this.sitValue = 20;
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
                    if (!this.isSit) {
                        this.height = this.height - this.sitValue
                        this.position.y += this.sitValue
                    }
                    this.isSit = true;
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
                case 83:
                    if (this.isSit) {
                        this.height = this.height + this.sitValue
                        this.position.y -= this.sitValue
                    }
                    this.isSit = false;
                    break;
            }
        })
        if (this.gravity === 0) {
            this.isJumping = false;
        }
    }

    fallCheck() {
        if (this.position.y + this.height > this.border.maxHeight) {
            this.playground.stop()
        }
    }

    update() {
        super.update();
        this.setMove();
        this.fallCheck();
    }
}
