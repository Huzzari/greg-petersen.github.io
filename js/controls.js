define(["./constants", "./player"], (_constants, _player) => {
  const { KEYBOARD } = _constants
  const { player } = _player
  const doc = $(document)

  doc.keydown(e => {
    switch (e.keyCode) {
      case KEYBOARD.LEFT:
        player.input.LEFT = true
        break
      case KEYBOARD.RIGHT:
        player.input.RIGHT = true
        break
      case KEYBOARD.SPACEBAR:
        player.shoot()
        break
    }
  })

  doc.keyup(e => {
    switch (e.keyCode) {
      case KEYBOARD.LEFT:
        player.input.LEFT = false
        break
      case KEYBOARD.RIGHT:
        player.input.RIGHT = false
        break
    }
  })
})
