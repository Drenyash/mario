import {GameObject} from "./GameObject.js";

export class Brick extends GameObject {
    constructor(...props) {
        super(...props);
        this.width = (Math.floor(Math.random() * 6) + 1) * 64;
        this.height = 4 * this.sizeMultiplier;
        this.position = {
            x: Math.floor(Math.random() * (Math.floor(window.innerWidth / 64) - 1)) * 64,
            y: (window.innerHeight - 4) - (Math.floor(Math.random() * 11) + 4) * 64
        };
        this.name = 'brick'
        this.style = 'black';
        this.canCollided = true;
    }

    update() {
        super.update();
    }
}
