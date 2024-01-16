import {Player} from "./Player.js";
import {Brick} from "./Brick.js";

export class Playground {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.border = {
            minWidth: 0,
            minHeight: 0,
            maxWidth: window.innerWidth,
            maxHeight: window.innerHeight,
        }
        this.sizeMultiplier = 16;
        this.gameObjects = [];
        this.player = new Player(
            4 * this.sizeMultiplier,
            4 * this.sizeMultiplier,
            {
                x: 0,
                y: 0
            },
            this.context,
            this.border,
            'blue',
            this.gameObjects)
    }

    create() {
        this.setSize()
        this.createGameObjects()
        this.update()
    }

    setSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createGameObjects() {
        this.object = new Brick(
            20 * this.sizeMultiplier,
            4 * this.sizeMultiplier,
            {
                x: 12 * this.sizeMultiplier,
                y: this.border.maxHeight - 8 * this.sizeMultiplier
            },
            this.context,
            this.border,
            'black')
        this.object2 = new Brick(
            20 * this.sizeMultiplier,
            4 * this.sizeMultiplier,
            {
                x: 36 * this.sizeMultiplier,
                y: this.border.maxHeight - 18 * this.sizeMultiplier
            },
            this.context,
            this.border,
            'black')
        this.gameObjects.push(this.object)
        this.gameObjects.push(this.object2)
    }

    checkCollision() {
        this.gameObjects.forEach(object => {
            if (
                this.player.position.x + this.player.width >= object.position.x
                && this.player.position.y + this.player.height >= object.position.y
                && this.player.position.x <= object.position.x + object.width
                && this.player.position.y <= object.position.y + object.height
            ) {
                if (this.player.moveX === -this.player.moveSpeed) {
                    this.player.position.x = object.position.x + object.width + 0.01
                    return
                }
                if (this.player.moveX === this.player.moveSpeed) {
                    this.player.position.x = object.position.x - this.player.width - 0.01
                }
            }
        })
    }

    restoreCanvas() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    update() {
        this.restoreCanvas()

        this.gameObjects.forEach(object => {
            object.update()
        })
        this.player.update()

        this.checkCollision()

        requestAnimationFrame(() => this.update())
    }
}