import {Player} from "./Player.js";
import {Brick} from "./Brick.js";
import {Mushroom} from "./Mushroom.js";
import {Entity} from "./Entity.js";
import {UI} from "./UI.js";
import {Coin} from "./Coin.js";

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
        this.sizeMultiplier = 16;
        this.gameObjects = [];
        this.enemies = [];
        this.coins = [];
        this.player = new Player({
            width: 4 * this.sizeMultiplier,
            height: 4 * this.sizeMultiplier,
            position: {
                x: 0,
                y: 0
            },
            context: this.context,
            border: this.border,
            style: 'blue',
            gameObjects: this.gameObjects,
            enemies: this.enemies
        });
        this.UI = new UI({
            context: this.context
        })
    }

    create() {
        this.setSize()
        this.createGameObjects()
        this.createEnemy()
        this.createCoins()
        this.update()
    }

    setSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createGameObjects() {
        this.gameObjects.push(new Brick({
            width: window.innerWidth,
            height: 4 * this.sizeMultiplier,
            position: {
                x: 0,
                y: this.border.maxHeight - 4 * this.sizeMultiplier
            },
            context: this.context,
            border: this.border,
            style: 'black',
        }))
        this.gameObjects.push(new Brick({
            width: 20 * this.sizeMultiplier,
            height: 4 * this.sizeMultiplier,
            position: {
                x: 12 * this.sizeMultiplier,
                y: this.border.maxHeight - 12 * this.sizeMultiplier
            },
            context: this.context,
            border: this.border,
            style: 'black',
        }))
        this.gameObjects.push(new Brick({
            width: 26 * this.sizeMultiplier,
            height: 4 * this.sizeMultiplier,
            position: {
                x: 36 * this.sizeMultiplier,
                y: this.border.maxHeight - 16 * this.sizeMultiplier
            },
            context: this.context,
            border: this.border,
            style: 'black',
        }))
    }

    createCoins() {
        this.coins.push(
            new Coin({
                width: 4 * this.sizeMultiplier,
                height: 4 * this.sizeMultiplier,
                position: {
                    x: 102 * 16,
                    y: 0
                },
                context: this.context,
                border: this.border,
                style: 'yellow',
                gameObjects: this.gameObjects,
            })
        )
    }

    createEnemy() {
        this.enemies.push(
            new Mushroom({
                width: 4 * this.sizeMultiplier,
                height: 4 * this.sizeMultiplier,
                position: {
                    x: 20 * 16,
                    y: 0
                },
                context: this.context,
                border: this.border,
                style: 'red',
                gameObjects: this.gameObjects,
            }))
        this.enemies.push(
            new Mushroom({
                width: 4 * this.sizeMultiplier,
                height: 4 * this.sizeMultiplier,
                position: {
                    x: 44 * 16,
                    y: 0
                },
                context: this.context,
                border: this.border,
                style: 'red',
                gameObjects: this.gameObjects,
            }))
        this.enemies.push(
            new Mushroom({
                width: 4 * this.sizeMultiplier,
                height: 4 * this.sizeMultiplier,
                position: {
                    x: 74 * 16,
                    y: 0
                },
                context: this.context,
                border: this.border,
                style: 'red',
                gameObjects: this.gameObjects,
            }))
    }

    collisionAvoidance(object) {
        if (this.player.moveX === -this.player.moveSpeed) {
            this.player.position.x = object.position.x + object.width + 0.01
            return
        }
        if (this.player.moveX === this.player.moveSpeed) {
            this.player.position.x = object.position.x - this.player.width - 0.01
        }
    }

    checkCollision(object, checkCollision) {
        object.forEach(object => {
            if (
                this.player.position.x + this.player.width >= object.position.x
                && this.player.position.y + this.player.height >= object.position.y
                && this.player.position.x <= object.position.x + object.width
                && this.player.position.y <= object.position.y + object.height
            ) {
                if (checkCollision) {
                    this.collisionAvoidance(object)
                } else {
                    if (object.name === 'mushroom') {
                        if (this.player.gravity > 0) {
                            this.UI.setScore(object)
                            this.enemies.splice(this.enemies.indexOf(object), 1)
                        } else {
                            this.stop()
                        }
                    } else {
                        this.UI.setScore(object)
                        this.coins.splice(this.coins.indexOf(object), 1)
                    }
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
        this.enemies.forEach(enemy => {
            enemy.update()
        })
        this.coins.forEach(coin => {
            coin.update()
        })
        this.player.update()
        this.UI.update()

        this.checkCollision(this.gameObjects, true)
        this.checkCollision(this.enemies, false)
        this.checkCollision(this.coins, false)
        if (this.gameIsStarted) {
            requestAnimationFrame(() => this.update())
        }
    }

    stop() {
        this.gameIsStarted = false;
        this.UI.gameOver()
    }
}