export class UI {
    constructor({context}) {
        this.context = context
        this.score = 0;
    }

    update() {
        this.context.font = '32px Arial'
        this.context.fillText(`Очки: ${this.score}`, 20, 50)
    }

    setScore(object) {
        if (object.name === 'coin') {
            this.score += 100;
        } else if (object.name === 'mushroom') {
            this.score += 50;
        }
    }

    gameOver() {
        this.context.font = '98px Arial'
        this.context.fillText(`ПОТРАЧЕНО`, window.innerWidth / 2 - 300, window.innerHeight / 2)
        this.context.font = '32px Arial'
        this.context.fillText(`Начать заного`, window.innerWidth / 2 - 150, window.innerHeight / 2 + 100)
    }
}