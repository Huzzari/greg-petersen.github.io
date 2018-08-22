define(["./projectiles", "./constants"], (_projectiles, _constants) => {

  const doc = $(document)
  const canvasContext = $("#canvas").get(0).getContext("2d")
  const playerInfo = $("#playerInfo").get(0)

  const {PROJECTILE_HEIGHT, PROJECTILE_WIDTH} = _projectiles
  const {projectiles} = _projectiles
  const {KEYBOARD, DIRECTION, CANVAS_HEIGHT, CANVAS_WIDTH} = _constants

  const playerInput = {
    RIGHT: false,
    LEFT: false
  }

  const player = {
    size: {
      height: 50,
      width: 50
    },
    position: {
      x: 0,
      y: 450
    },
    isFiring: false
  }

  const aliens = []

  doc.keydown((e) => {
    switch (e.keyCode) {
      case KEYBOARD.LEFT:
        playerInput.LEFT = true
        break
      case KEYBOARD.RIGHT:
        playerInput.RIGHT = true
        break
      case KEYBOARD.SPACEBAR:
        shoot()
        break
      default:
        console.log("keydown", e.keyCode)
    }
  })

  doc.keyup((e) => {
    switch (e.keyCode) {
      case KEYBOARD.LEFT:
        playerInput.LEFT = false
        break
      case KEYBOARD.RIGHT:
        playerInput.RIGHT = false
        break
      default:
        console.log("keyup", e.keyCode)
    }
  })

  const draw = (x) => {
    drawPlayer()
    drawProjectiles()
    displayInfo()
    window.requestAnimationFrame(draw)
  }

  const drawPlayer = () => {
    if (playerInput.RIGHT && canMoveRight()) {
      moveRight()
    } else if (playerInput.LEFT && canMoveLeft()) {
      moveLeft()
    }

    canvasContext.fillStyle = 'green'
    canvasContext.fillRect(player.position.x, player.position.y,
      player.size.width, player.size.height)
  }

  const moveRight = () => {
    clearPlayer()
    player.position.x += 2
  }

  const moveLeft = () => {
    clearPlayer()
    player.position.x -= 2
  }

  const canMoveRight = () => {
    return (player.position.x + player.size.width) < CANVAS_WIDTH
  }

  const canMoveLeft = () => {
    return player.position.x > 0
  }

  const shoot = () => {
    const newProjectile = {
      size: {
        height: 20,
        width: 10
      },
      position: {
        x: player.position.x + player.size.width/2,
        y: player.position.y - PROJECTILE_HEIGHT
      },
      direction: DIRECTION.UP
    }

    projectiles.push(newProjectile)
  }

  const drawProjectiles = () => {
    projectiles.forEach((projectile) => drawProjectile(projectile))
  }

  const drawProjectile = (projectile) => {
    canvasContext.clearRect(projectile.position.x, projectile.position.y,
      projectile.size.width, projectile.size.height)
    canvasContext.fillStyle = 'blue'

    if (projectile.direction === DIRECTION.DOWN) {
      projectile.position.y += 5
    }

    if (projectile.direction === DIRECTION.UP) {
      projectile.position.y -= 5
    }

    if (!projectileVisible(projectile)) {
      let index = projectiles.indexOf(projectile)
      projectiles.splice(index, 1)
    } else {
      canvasContext.fillRect(projectile.position.x, projectile.position.y,
        projectile.size.width, projectile.size.height)
    }
  }

  const projectileVisible = (projectile) => {
    if ((projectile.position.y + projectile.size.height) < 0) {
      return false
    } else if ((projectile.position.y) > CANVAS_HEIGHT) {
      return false
    } else {
      return true
    }
  }

  const clearPlayer = () => {
    canvasContext.clearRect(player.position.x, player.position.y,
      player.size.height, player.size.width)
  }

  const displayInfo = () => {
    let output = ""
    output += "X: " + player.position.x
    output += "<br> Y: " + player.position.y
    output += "<br><br>Number of projectiles: " + projectiles.length
    playerInfo.innerHTML = output
  }

  window.requestAnimationFrame(draw)
})
