const Discord = require("discord.js")
const snake = require("snakecord")

module.exports = {
    name: 'snake',
    async execute (message, args, client) {
        const snakeGame = new snake({
            title: "Snake Game",
            color: "BLUE",
            timestamp: true,
            gameOverTitle: "You win!"
                })

        snakeGame.newGame(message)
    }
}