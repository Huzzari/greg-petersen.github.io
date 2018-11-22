define(["./player", "./aliens", "./projectiles"], (
	_player,
	_aliens,
	_projectiles
) => {
	const { player, destroyPlayer, playerArea } = _player
	const { aliens, destroyAlien } = _aliens
	const { projectiles, destroyProjectile } = _projectiles

	const isCollision = (obj1, obj2) => {
		// Bounding box collision detection.
		return (
			obj1.position.x < obj2.position.x + obj2.size.width &&
			obj1.position.x + obj1.size.width > obj2.position.x &&
			obj1.position.y < obj2.position.y + obj2.size.height &&
			obj1.size.height + obj1.position.y > obj2.position.y
		)
	}

	const checkCollisions = () => {
		aliens.forEach((alienStack, stackIndex) =>
			alienStack.forEach((alien, alienIndex) => {
				projectiles.forEach((projectile, projectileIndex) => {
					if (isCollision(projectile, player)) {
						destroyPlayer()
					}

					if (isCollision(projectile, alien) && projectile.isPlayers) {
						destroyAlien(alien, stackIndex, alienIndex)
						destroyProjectile(projectile, projectileIndex)
					}
				})

				if (isCollision(alien, playerArea)) {
					destroyPlayer()
				}
			})
		)

	}

	return {
		checkCollisions: checkCollisions
	}
})
