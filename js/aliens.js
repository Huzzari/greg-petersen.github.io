define(["./canvas", "./projectiles", "./constants", "./sounds", "./models/alien", "./models/projectile"], (
	_canvas,
	_projectiles,
	_constants,
	_sounds,
	Alien,
	Projectile
) => {
	const { clearObject, drawObject, clearLastObjectPosition } = _canvas
	const { projectiles } = _projectiles
	const { DIRECTION } = _constants
	const { alien_death, one, two, three, four } = _sounds
	const sounds = [one, two, three, four]
	const aliens = []

	const alienInfo = {
		alienCount: 0
	}

	let shootTimeCounter = 0
	let moveTimeCounter = 0
	let soundIndex = 0
	let aliensHaveMoved = false

	const generateAliens = () => {
		for (let i = 0; i < 7; i++) {
			for (let k = 0; k < 7; k++) {
				if (k == 0) {
					aliens[i] = []
				}
				aliens[i].push(new Alien(20 + i * 60, 380 - k * 60, DIRECTION.RIGHT))
				alienInfo.alienCount++
			}
		}
	}

	const drawAliens = () => {
		if (aliensHaveMoved) {
			aliens.forEach(alienStack =>
				alienStack.forEach(alien => {
					// console.log("Clear Last Object called with: ", alien.lastPosition.x, alien.lastPosition.y, alien.size.width, alien.size.height)
					clearLastObjectPosition(alien)
					drawObject(alien)
				})
			)
			aliensHaveMoved = false
		}
	}

	const destroyAlien = (alien, stackIndex, index) => {
		alienInfo.alienCount--
		aliens[stackIndex].splice(index, 1)
		if (aliens[stackIndex].length === 0) {
			aliens.splice(stackIndex, 1)
		}
		alien_death.play()
		clearObject(alien)
	}

	const alienFireProjectile = () => {
		if (shootTimeCounter >= 100) {
			shootTimeCounter = 0
			let alienStack = Math.floor(Math.random() * aliens.length)
			let bottomAlien = aliens[alienStack][0]

			projectiles.push(
				new Projectile(
					bottomAlien.position.x + bottomAlien.size.width / 2,
					bottomAlien.position.y + bottomAlien.size.height + 5,
					DIRECTION.DOWN,
					false
				)
			)
		} else {
			shootTimeCounter++
		}
	}

	const moveAliens = () => {
		// if (moveTimeCounter >= alienInfo.alienCount * 2) {
		if (moveTimeCounter >= 40) {
			moveTimeCounter = 0

			switch (aliens[0][0].directionMoving) {
				case DIRECTION.RIGHT:
					handleDirectionRight()
					break
				case DIRECTION.LEFT:
					handleDirectionLeft()
					break
			}

			if (soundIndex >= sounds.length) {
				soundIndex = 0
			}

			aliensHaveMoved = true
			sounds[soundIndex].play()
			soundIndex++
		} else {
			moveTimeCounter++
		}
	}

	const handleDirectionLeft = () => {
		aliens[0][0].canMoveLeft() ? moveAliensLeft() : moveAliensRight()
	}

	const handleDirectionRight = () => {
		aliens[aliens.length - 1][0].canMoveRight() ? moveAliensRight() : moveAliensLeft()
	}

	const moveAliensRight = () => {
		aliens.forEach(alienSet => alienSet.forEach(alien => alien.moveRight()))
	}

	const moveAliensLeft = () => {
		aliens.forEach(alienSet => alienSet.forEach(alien => alien.moveLeft()))
	}

	generateAliens()

	return {
		aliens,
		alienInfo,
		drawAliens,
		destroyAlien,
		alienFireProjectile,
		moveAliens
	}
})
