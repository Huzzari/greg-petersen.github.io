define(() => {
	const canvasElement = $("#canvas").get(0)
	const canvasContext = canvasElement.getContext("2d")

	canvasContext.scale(2, 2)

	const drawObject = (object) => {
		// canvasContext.fillStyle = object.color
		// canvasContext.fillRect(object.position.x, object.position.y, object.size.width, object.size.height)
		canvasContext.drawImage(object.sprite, object.position.x, object.position.y, object.size.width, object.size.height)
	}

	const clearObject = (object) => {
		canvasContext.clearRect(object.position.x, object.position.y, object.size.width, object.size.height)
	}

	const clearLastObjectPosition = (object) => {
		canvasContext.clearRect(object.lastPosition.x, object.lastPosition.y, object.size.width + 1, object.size.height + 1)
	}

	return {
		clearObject,
		clearLastObjectPosition,
		drawObject,
		canvasContext,
		canvasElement
	}
})
