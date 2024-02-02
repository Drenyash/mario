import {GameObject} from "./GameObject.js";

export class Floor extends GameObject{
    constructor(props) {
        super(props);
        this.name = 'floor'
        this.style = 'brown';
        this.width = Math.floor(Math.random() * (Math.floor(window.innerWidth / 64) - 1)) * 64
        this.height = 4 * this.sizeMultiplier + 4;
        this.position = {
            x: Math.floor(Math.random() * 15) * 64,
            y: window.innerHeight - this.height
        }
        this.canCollided = true;
    }

    update() {
        super.update();
    }
}
