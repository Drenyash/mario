import {Player} from "./Player.js";
import {Brick} from "./Brick.js";
import {UI} from "./UI.js";
import {Floor} from "./Floor.js";
import {Mushroom} from "./Mushroom.js";

export class Playground {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.gameIsStarted = true;
        this.border = {
            minWidth: 0,
            minHeight: 0,
            maxWidth: window.innerWidth,
            maxHeight: window.innerHeight,
        }
        this.gameObjects = {
            bricks: [],
            enemies: [],
            coins: [],
            floor: [],
        };
        this.player = new Player({playground: this});
        this.UI = new UI({playground: this})
    }

    create() {
        this.setSize()
        this.update()
        this.renderBricks()
        this.renderFloor()
        this.renderEnemies()
    }

    setSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    collisionAvoidance(object) {
        if (this.player.moveX === -this.player.moveSpeed) {
            this.player.moveX = 0
            this.player.position.x = object.position.x + object.width + 0.001
            return
        }
        if (this.player.moveX === this.player.moveSpeed) {
            this.player.moveX = 0
            this.player.position.x = object.position.x - this.player.width - 0.001
        }
    }

    checkCollision(object) {
        if (
            this.player.position.x + this.player.width >= object.position.x
            && this.player.position.y + this.player.height >= object.position.y
            && this.player.position.x <= object.position.x + object.width
            && this.player.position.y <= object.position.y + object.height
        ) {
            if (object.canCollided) {
                this.collisionAvoidance(object)
            } else {
                if (object.name === 'mushroom') {
                    if (this.player.gravity > 0) {
                        this.UI.setScore(object)
                        this.gameObjects['enemies'].splice(this.gameObjects['enemies'].indexOf(object), 1)
                    } else {
                        this.stop()
                    }
                } else if (object.name === 'coin') {
                    this.UI.setScore(object)
                    this.gameObjects.coins.splice(this.gameObjects['coins'].indexOf(object), 1)
                }
            }
        }
    }

    restoreCanvas() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    renderBricks() {
        function isColliding(rect1, rect2) {
            return rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.y + rect1.height > rect2.y;
        }

        while (this.gameObjects.bricks.length < 30) {
            let brick = new Brick({playground: this})

            this.gameObjects.bricks.push(brick)
        }
    }

    renderEnemies() {
        while (this.gameObjects.enemies.length < 10) {
            let enemy = new Mushroom({playground: this})
            this.gameObjects.enemies.push(enemy)
        }
    }

    renderFloor() {
        while (this.gameObjects.floor.length < 2) {
            const floor = new Floor({playground: this})
            this.gameObjects.floor.push(floor);
        }
        this.gameObjects.floor[0].position.x = 0;
        this.gameObjects.floor[1].width = window.innerWidth
        this.gameObjects.floor[1].position.x = this.gameObjects.floor[0].width + (Math.floor(Math.random() * 3) + 2) * 64;
    }

    update() {
        this.restoreCanvas()
        for (let key in this.gameObjects) {
            this.gameObjects[key].forEach(object => {
                object.update()
                this.checkCollision(object)
            })
        }

        this.player.update()
        this.UI.update()

        if (this.gameIsStarted) {
            requestAnimationFrame(() => this.update())
        }
    }

    stop() {
        this.gameIsStarted = false;
        this.UI.gameOver()
    }
}
