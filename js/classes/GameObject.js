export class GameObject {
    constructor({width, height, position, context, border, style, gameObjects, name}) {
        this.context = context;
        this.border = border;
        this.style = style;
        this.gameObjects = gameObjects
        this.name = name;

        this.width = width;
        this.height = height;
        this.position = position
        this.gravity = 0;
    }

    update() {
        this.context.fillStyle = this.style;
        this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}