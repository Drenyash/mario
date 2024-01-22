import {Entity} from "./Entity.js";

export class Coin extends Entity {
    constructor(...props) {
        super(...props)
        this.name = 'coin'
    }

    update() {
        super.update();
    }
}