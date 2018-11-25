define(["./canvas", "./constants", "./models"], (_canvas, _constants, _models) => {
  // const { drawObject, clearObject } = _canvas
  const { CANVAS_WIDTH } = _constants
  const { Player } = _models

  const player = new Player("player", 300, 700, 30, 30, null)

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
    visible: false
  }

  return {
    playerArea,
    player
  }
})
