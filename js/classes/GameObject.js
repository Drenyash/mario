export class GameObject {
    constructor(width, height, position, context, border, style, gameObjects) {
        this.context = context;
        this.border = border;
        this.style = style;
        this.gameObjects = gameObjects

        this.width = width;
        this.height = height;
        this.position = position
        this.gravity = 0;
        this.moveSpeed = 3;
    }

    update() {
        this.context.fillStyle = this.style;
        this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}