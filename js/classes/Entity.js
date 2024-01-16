import {GameObject} from "./GameObject.js";

export class Entity extends GameObject{
    constructor(...props) {
        super(...props)
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

    update() {
        super.update();
        this.setGravity()
    }
}