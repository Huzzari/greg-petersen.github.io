define([
	"./player",
	"./projectiles",
	"./aliens",
	"./collision",
	"./objective",
	"./sounds",
	"./models/gameObject"
], (_player, _projectiles, _aliens, _collision, _objective, _sounds, GameObject) => {
	const playerInfoElement = $("#playerInfo").get(0)
	const { projectiles, drawProjectiles } = _projectiles
	const { player, drawPlayer, drawPlayerArea } = _player
	const { drawAliens, alienFireProjectile, moveAliens, alienInfo } = _aliens
	const { checkCollisions } = _collision
	const { checkIfGameOver } = _objective
	const { playBeat } = _sounds

	let gameStarted = false
	let framesElapsedSinceBeat = 0

	let fps = 30

	let gameObjects = []
	gameObjects["testInvader"] = new GameObject("testInvader", 64, 64, 100, 100)

	let imageElements = []
	imageElements[gameObjects["testInvader"].id] = new Image().src = "./sprites/testInvader.png"

	const gameUpdate = (object) => {
		// Update incoming object
	}

	setInterval(() => {
		for (let i = 0; i < sprites.length - 1; i++) {
			gameUpdate(sprites[i]);
		}
	}, 1000 / fps)

	const draw = () => {
		// playMusic()
		// drawPlayerArea()
		// drawPlayer()
		// drawProjectiles()
		// moveAliens()
		// drawAliens()
		// alienFireProjectile()
		// checkCollisions()
		// displayInfo()
		// if (!checkIfGameOver()) {
		// }
		for (let i = 0; i < sprites.length - 1; i++) {
			animationUpdate(sprites[i])
		}

		window.requestAnimationFrame(draw)
	}

	const animationUpdate = (object) => {
		if (object.requiresUpdate) {
			console.log("Object requested update")
			object.requiresUpdate = false
		}
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
