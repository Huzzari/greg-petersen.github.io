define([
  "./player",
  "./projectiles",
  "./aliens",
  "./collision",
  "./objective",
  "./sounds",
  "./models",
  "./canvas",
  "./globals"
], (_player, _projectiles, _aliens, _collision, _objective, _sounds, _models, _canvas, _globals) => {
  const playerInfoElement = $("#playerInfo").get(0)
  const { projectilesStep, projectiles } = _projectiles
  const { player } = _player
  const { gameObjects, sprites } = _globals
  const { generateAliens, alienStep, alienInfo } = _aliens
  const { checkCollisions } = _collision
  const { checkIfGameOver } = _objective
  const { playBeat } = _sounds
  const { reDraw, clearObject } = _canvas

  let gameStarted = false
  let framesElapsedSinceBeat = 0

  let fps = 30

  const gameLoop = () => {
    checkCollisions()
    playMusic()
    player.update()
    projectilesStep()
    alienStep()
    displayInfo()
  }

  const drawLoop = () => {
    gameObjects.forEach((value) => animationUpdate(value))

    if (!checkIfGameOver()) {
      window.requestAnimationFrame(drawLoop)
    }
  }

  const animationUpdate = (object) => {
    if (object.requiresUpdate) {
      if (object.isDead) {
        clearObject(object)
      } else {
        reDraw(object)
      }
    }
  }

  const playMusic = () => {
    if (framesElapsedSinceBeat >= alienInfo.alienCount * 0.7) {
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

  const setupGame = () => {
    var imageLoaders = []

    imageLoaders.push(loadSprite("testInvader", "../sprites/testInvader.png"))
    imageLoaders.push(loadSprite("playerProjectile", "../sprites/playerProjectile.png"))
    imageLoaders.push(loadSprite("alienProjectile", "../sprites/alienProjectile.png"))

    $.when.apply(null, imageLoaders).done(() => {
      setInterval(gameLoop, 1000 / fps)
      initializeGameObjects()
      window.requestAnimationFrame(drawLoop)
    })
  }

  const initializeGameObjects = () => {
    player.sprite = sprites.get("testInvader")
    generateAliens(sprites.get("testInvader"))
    gameObjects.set("player", player)
  }

  $(document).on("click", () => {
    if (!gameStarted) {
      gameStarted = true
      setupGame()
    }
  })
})
