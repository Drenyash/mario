import {Entity} from "./Entity.js";

export class Coin extends Entity {
    constructor(...props) {
        super(...props)
        this.name = 'coin'
        this.canCollided = false;
    }

    update() {
        super.update();
    }
}
