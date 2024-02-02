import {GameObject} from "./GameObject.js";
import {Playground} from "./Playground.js";

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
            this.position.y = this.border.maxHeight - this.height + this.gravity
        }
    }

    detectCollision(object) {
        if (
            this.position.x + this.width >= object.position.x
            && this.position.y + this.height >= object.position.y
            && this.position.x <= object.position.x + object.width
            && this.position.y <= object.position.y + object.height
        ) {
            if (this.gravity > 0) {
                this.gravity = 0;
                this.position.y = object.position.y - this.height - 0.001
                return
            } else {
                this.position.y = object.position.y - this.height - 0.001
            }
            if (this.gravity < 0) {
                this.gravity = 0;
                this.position.y = object.position.y + object.height + 0.001
            } else {
                this.position.y = object.position.y + object.height + 0.001
            }
        }
    }

    checkCollision() {
        this.gameObjects.bricks.forEach(object => {
            this.detectCollision(object)
        })
        this.gameObjects.floor.forEach(object => {
            this.detectCollision(object)
        })
    }

    checkWindowCollision() {
        if (this.moveX === -this.moveSpeed && this.position.x <= this.border.minWidth) {
            this.position.x = this.border.minWidth
        } else if (this.moveX === this.moveSpeed && this.position.x >= this.border.maxWidth - this.width) {
            this.position.x = this.border.maxWidth - this.width
        } else {
            this.position.x += this.moveX;
        }
    }

    update() {
        super.update();
        this.setGravity()
        this.checkCollision()
        this.checkWindowCollision()
    }
}
