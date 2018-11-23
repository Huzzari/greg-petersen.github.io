define([
	"./player",
	"./projectiles",
	"./aliens",
	"./collision",
	"./objective",
	"./sounds",
	"./models/gameObject",
	"./canvas"
], (_player, _projectiles, _aliens, _collision, _objective, _sounds, GameObject, _canvas) => {
	const playerInfoElement = $("#playerInfo").get(0)
	const { projectiles, drawProjectiles } = _projectiles
	const { player, drawPlayer, drawPlayerArea } = _player
	const { drawAliens, alienFireProjectile, moveAliens, alienInfo } = _aliens
	const { checkCollisions } = _collision
	const { checkIfGameOver } = _objective
	const { playBeat } = _sounds
	const { drawObject } = _canvas

	let gameStarted = false
	let framesElapsedSinceBeat = 0

	let fps = 30

	let gameObjects = new Map()
	let sprites = new Map()

	const gameUpdate = (object) => {
		// Update incoming object
	}

	setInterval(() => {
		gameObjects.forEach(gameObject => gameUpdate(gameObject))
	}, 1000 / fps)

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

	const draw = () => {
		gameObjects.forEach(value => animationUpdate(value))
		window.requestAnimationFrame(draw)
	}

	const animationUpdate = (object) => {
		if (object.requiresUpdate) {
			console.log("Object requested update")
			drawObject(object)
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

	const loadSprite = (id, src) => {
		var deferred = $.Deferred()
		var sprite = new Image()
		sprite.src = src
		sprite.id = id

		sprite.onload = () => {
			console.log("Sprite loaded", id)
			sprites.set(id, sprite)
			deferred.resolve()
		}
		return deferred.promise()
	}

	$(document).on("click", () => {
		if (!gameStarted) {
			gameStarted = true
			// Try to start game, check if all images loaded

			var imageLoaders = []
			imageLoaders.push(loadSprite("testInvader", "../sprites/testInvader.png"))

			$.when.apply(null, imageLoaders).done(() => {
				gameObjects.set("testInvader", new GameObject("testInvader", 64, 64, 100, 100, sprites.get("testInvader")))
				window.requestAnimationFrame(draw)
			})
		}
	})
})
