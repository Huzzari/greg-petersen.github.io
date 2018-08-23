define([
	"./player",
	"./projectiles",
	"./aliens",
	"./collision",
	"./objective"
], (_player, _projectiles, _aliens, _collision, _objective) => {
	const playerInfoElement = $("#playerInfo").get(0)
	const { projectiles, drawProjectiles } = _projectiles
	const { player, drawPlayer } = _player
	const { drawAliens, alienFireProjectile, moveAliens, alienInfo } = _aliens
	const { checkCollisions } = _collision
	const { checkIfGameOver } = _objective

	let gameStarted = false

	const draw = () => {
		drawPlayer()
		drawProjectiles()
		moveAliens()
		drawAliens()
		alienFireProjectile()
		checkCollisions()
		displayInfo()
		if (!checkIfGameOver()) {
			window.requestAnimationFrame(draw)
		}
	}

	const displayInfo = () => {
		let output = ""
		output += "X: " + player.position.x
		output += "<br> Y: " + player.position.y
		output += "<br><br>Number of projectiles: " + projectiles.length
		output += "<br><br>Number of aliens: " + alienInfo.alienCount
		playerInfoElement.innerHTML = output
	}

	const startGame = () => {
		gameStarted = true
		window.requestAnimationFrame(draw)
	}

	$(document).on("click", () => {
		if (!gameStarted) {
			startGame()
		}
	})
})
