export class GameObject {
    constructor({width, height, position, style, name, collided, playground}) {
        this.playground = playground;
        this.context = this.playground.context;
        this.border = this.playground.border;
        this.style = style;
        this.name = name;
        this.canCollided = collided;
        this.gameObjects = this.playground.gameObjects;
        this.width = width;
        this.height = height;
        this.position = position;

        this.gravity = 0;
        this.sizeMultiplier = 16;
    }

    update() {
        this.context.fillStyle = this.style;
        this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
