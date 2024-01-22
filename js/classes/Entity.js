import {GameObject} from "./GameObject.js";

export class Entity extends GameObject{
    constructor(...props) {
        super(...props)
        this.moveSpeed = 3;
    }

    setGravity() {
        if (this.position.y < this.border.maxHeight - this.height) {
            this.gravity += 0.4;
            this.position.y += this.gravity
        } else {
            if (this.gravity > 0) {
                this.gravity = 0;
            }
            this.position.y = this.border.maxHeight - this.height + this.gravity
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

    checkWindowCollision() {
        if (this.position.x <= this.border.minWidth) {
            this.position.x = this.border.minWidth + 0.01
        } else if (this.position.x >= this.border.maxWidth - this.width) {
            this.position.x = this.border.maxWidth - this.width - 0.01
        } else {
            this.position.x += this.moveX;
        }
    }

    update() {
        super.update();
        this.setGravity()
        this.checkCollision()
    }
}