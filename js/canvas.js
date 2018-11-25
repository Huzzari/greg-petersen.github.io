define(() => {
  const canvasElement = $("#canvas").get(0)
  const canvasContext = canvasElement.getContext("2d")

  canvasContext.scale(2, 2)

  const drawObject = (object) => {
    canvasContext.drawImage(object.sprite, object.position.x, object.position.y, object.size.width, object.size.height)
    object.requiresUpdate = false
  }

  const clearObject = (object) => {
    canvasContext.clearRect(object.position.x, object.position.y, object.size.width, object.size.height)
    object.requiresUpdate = false
  }

  const clearLastObjectPosition = (object) => {
    canvasContext.clearRect(object.lastPosition.x, object.lastPosition.y, object.size.width + 1, object.size.height + 1)
    object.requiresUpdate = false
  }

  const reDraw = (object) => {
    clearLastObjectPosition(object)
    drawObject(object)
    object.requiresUpdate = false
  }

  return {
    clearObject,
    clearLastObjectPosition,
    drawObject,
    canvasContext,
    canvasElement,
    reDraw
  }
})
