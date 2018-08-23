define(["./canvas", "./constants"], (_canvas, _constants) => {
	const { clearObject, drawObject } = _canvas
	const projectiles = []

	const drawProjectiles = () => {
		projectiles.forEach(projectile => {
			clearObject(projectile)
			projectile.move()

			if (!projectile.isVisible()) {
				let index = projectiles.indexOf(projectile)
				projectiles.splice(index, 1)
			} else {
				drawObject(projectile)
			}
		})
	}

	const playerCanShoot = () => {
		let playerProjectiles = 0
		projectiles.forEach(projectile => {
			if (projectile.isPlayers) {
				playerProjectiles++
			}
		})

		if (playerProjectiles < 2) {
			return true
		}
		return false
	}

	this.destroyProjectile = (projectile, index) => {
		clearObject(projectile)
		projectiles.splice(index, 1)
	}

	return {
		projectiles,
		destroyProjectile,
		drawProjectiles,
		playerCanShoot
	}
})
