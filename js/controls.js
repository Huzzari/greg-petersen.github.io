define(["./constants", "./player", "./sounds"], (_constants, _player) => {
  const { KEYBOARD } = _constants
  const { playerInput, shoot } = _player
  const doc = $(document)

  doc.keydown(e => {
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
    }
  })

  doc.keyup(e => {
    switch (e.keyCode) {
      case KEYBOARD.LEFT:
        playerInput.LEFT = false
        break
      case KEYBOARD.RIGHT:
        playerInput.RIGHT = false
        break
    }
  })
})
