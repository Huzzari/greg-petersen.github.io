define(["./canvas", "./constants", "./projectiles", "./sounds", "./models/projectile"], (
	_canvas,
	_constants,
	_projectiles,
	_sounds,
	Projectile
) => {
	const { drawObject, clearObject } = _canvas
	const { CANVAS_WIDTH, DIRECTION, PROJECTILE_HEIGHT, PROJECTILE_WIDTH, } = _constants
	const { projectiles, playerCanShoot } = _projectiles
	const { shoot: shoot_sound } = _sounds

	const playerInput = {
		RIGHT: false,
		LEFT: false
	}

	const playerArea = {
		size: {
			height: 60,
			width: CANVAS_WIDTH
		},
		position: {
			x: 0,
			y: 700
		},
		color: "lightgreen",
		visible: true
	}

	// TODO: Refactor Player into class
	const player = {
		size: {
			height: 30,
			width: 30
		},
		position: {
			x: 300,
			y: 700
		},
		isFiring: false,
		color: "teal",
		isAlive: true
	}

	const moveRight = () => {
		player.position.x += 3
	}

	const moveLeft = () => {
		player.position.x -= 3
	}

	const drawPlayerArea = () => {
		drawObject(playerArea)
	}

	const drawPlayer = () => {
		clearObject(player)
		if (playerInput.RIGHT && canMoveRight()) {
			moveRight()
		} else if (playerInput.LEFT && canMoveLeft()) {
			moveLeft()
		}

		drawObject(player)
	}

	const canMoveRight = () => {
		return player.position.x + player.size.width < CANVAS_WIDTH - 50
	}

	const canMoveLeft = () => {
		return player.position.x > 50
	}

	const shoot = () => {
		if (playerCanShoot()) {
			projectiles.push(
				new Projectile(
					player.position.x + player.size.width / 2 - PROJECTILE_WIDTH / 2,
					player.position.y - PROJECTILE_HEIGHT,
					DIRECTION.UP,
					true
				)
			)
			shoot_sound.play()
		}
	}

	const destroyPlayer = () => {
		player.isAlive = false
	}

	return {
		playerArea,
		drawPlayerArea,
		playerInput,
		player,
		drawPlayer,
		shoot,
		destroyPlayer
	}
})
