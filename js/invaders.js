define([
	"./player",
	"./projectiles",
	"./aliens",
	"./collision",
	"./objective",
	"./sounds"
], (_player, _projectiles, _aliens, _collision, _objective, _sounds) => {
	const playerInfoElement = $("#playerInfo").get(0)
	const { projectiles, drawProjectiles } = _projectiles
	const { player, drawPlayer, drawPlayerArea } = _player
	const { drawAliens, alienFireProjectile, moveAliens, alienInfo } = _aliens
	const { checkCollisions } = _collision
	const { checkIfGameOver } = _objective
	const { playBeat } = _sounds

	let gameStarted = false
	let framesElapsedSinceBeat = 0
	let totalElapsedFrames = 0

	const draw = () => {
		playMusic()
		drawPlayerArea()
		drawPlayer()

		// if (totalElapsedFrames % 2 == 0) {
		drawProjectiles()
		// }

		moveAliens()
		drawAliens()
		alienFireProjectile()
		checkCollisions()
		displayInfo()
		if (!checkIfGameOver()) {
			window.requestAnimationFrame(draw)
		}
		totalElapsedFrames++
	}

	const playMusic = () => {
		if (framesElapsedSinceBeat >= alienInfo.alienCount * 1.25) {
			framesElapsedSinceBeat = 0
			playBeat()
		}
		framesElapsedSinceBeat++
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
