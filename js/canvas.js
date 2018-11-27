define(() => {
  const canvasElement = $("#canvas").get(0)
  const canvasContext = canvasElement.getContext("2d")

  canvasContext.scale(2, 2)

  return {
    canvasContext,
    canvasElement
  }
})
