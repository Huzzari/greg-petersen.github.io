define(["./projectiles", "./constants", "./sounds", "./models", "./globals"], (
  _projectiles,
  _constants,
  _sounds,
  _models,
  _globals
) => {
  const { projectiles, getNextProjectileId } = _projectiles
  const { DIRECTION } = _constants
  const { alien_death } = _sounds
  const { Alien, AlienProjectile } = _models
  const { gameObjects } = _globals

  const aliens = []

  const alienInfo = {
    alienCount: 0
  }

  let shootTimeCounter = 0
  let moveTimeCounter = 0

  const generateAliens = (sprite) => {
    for (let i = 0; i < 7; i++) {
      for (let k = 0; k < 7; k++) {
        if (k == 0) {
          aliens[i] = []
        }
        let alien = new Alien(`Alien${i}${k}`, 20 + i * 60, 380 - k * 60, DIRECTION.RIGHT, sprite)
        aliens[i].push(alien)
        gameObjects.set(`Alien${i}${k}`, alien)
        alienInfo.alienCount++
      }
    }
  }

  const alienStep = () => {
    moveAliens()
    alienFireProjectile()
  }

  const destroyAlien = (alien, stackIndex, index) => {
    alienInfo.alienCount--
    aliens[stackIndex].splice(index, 1)
    if (aliens[stackIndex].length === 0) {
      aliens.splice(stackIndex, 1)
    }
    alien.die()
    alien_death.play()
  }

  const alienFireProjectile = () => {
    if (shootTimeCounter >= 50) {
      shootTimeCounter = 0
      let alienStack = Math.floor(Math.random() * aliens.length)
      let bottomAlien = aliens[alienStack][0]

      let projectile = new AlienProjectile(
        `Projectile-${getNextProjectileId()}`,
        bottomAlien.position.x + bottomAlien.size.width / 2,
        bottomAlien.position.y + bottomAlien.size.height + 5,
        DIRECTION.DOWN
      )

      projectiles.push(projectile)
      gameObjects.set(projectile.id, projectile)
    } else {
      shootTimeCounter++
    }
  }

  const moveAliens = () => {
    if (moveTimeCounter >= alienInfo.alienCount * 0.7) {
      moveTimeCounter = 0

      switch (aliens[0][0].directionMoving) {
        case DIRECTION.RIGHT:
          handleDirectionRight()
          break
        case DIRECTION.LEFT:
          handleDirectionLeft()
          break
      }
    } else {
      moveTimeCounter++
    }
  }

  const handleDirectionLeft = () => {
    aliens[0][0].canMoveLeft() ? moveAliensLeft() : moveAliensDownThenRight()
  }

  const handleDirectionRight = () => {
    aliens[aliens.length - 1][0].canMoveRight() ? moveAliensRight() : moveAliensDownThenLeft()
  }

  const moveAliensRight = () => {
    aliens.forEach((alienSet) => alienSet.forEach((alien) => alien.moveRight()))
  }

  const moveAliensLeft = () => {
    aliens.forEach((alienSet) => alienSet.forEach((alien) => alien.moveLeft()))
  }

  const moveAliensDownThenRight = () => {
    aliens.forEach((alienSet) =>
      alienSet.forEach((alien) => {
        alien.moveRight()
        alien.moveDown()
      })
    )
  }

  const moveAliensDownThenLeft = () => {
    aliens.forEach((alienSet) =>
      alienSet.forEach((alien) => {
        alien.moveLeft()
        alien.moveDown()
      })
    )
  }

  return {
    aliens,
    alienInfo,
    generateAliens,
    alienStep,
    destroyAlien
  }
})
