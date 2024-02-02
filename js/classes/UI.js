export class UI {
    constructor({playground}) {
        this.playground = playground
        this.context = this.playground.context
        this.score = 0;

        this.startAgainText = {
            text: `Начать заного`,
            position: {
                x: window.innerWidth / 2 - 150,
                y: window.innerHeight / 2 + 100,
            },
            font: '32px Arial',
        }

        this.gameOverText = {
            text: `ПОТРАЧЕНО`,
            position: {
                x: window.innerWidth / 2 - 300,
                y: window.innerHeight / 2,
            },
            font: '98px Arial',
        }

        this.scoreText = {
            text: `Очки: ${this.score}`,
            position: {
                x: 20,
                y: 50,
            },
            font: '32px Arial',
        }

        this.events()
    }

    update() {
        this.scoreText.text = `Очки: ${this.score}`
        this.print(this.scoreText)
    }

    setScore(object) {
        if (object.name === 'coin') {
            this.score += 100;
        } else if (object.name === 'mushroom') {
            this.score += 50;
        }
    }

    gameOver() {
        this.print(this.gameOverText)
        this.print(this.startAgainText)
    }

    print(object) {
        this.context.font = object.font;
        this.context.fillText(object.text, object.position.x, object.position.y)
    }

    clickEvent(object) {
        this.context.canvas.addEventListener('click', (evt) => {
            const metrics = this.context.measureText(object.text)
            const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
            if (object.position.x + metrics.width > evt.offsetX
                && object.position.x < evt.offsetX
                && object.position.y - actualHeight < evt.offsetY
                && object.position.y > evt.offsetY
            ) {
                this.playground.create()
            }
        })
    }

    events() {
        this.clickEvent(this.startAgainText)
    }
}
