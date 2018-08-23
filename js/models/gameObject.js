define(() => {

	class GameObject {
		constructor(x, y, height, width) {
			this.position = { x, y }
			this.lastPosition = { x: this.position.x, y: this.position.y }
			this.size = { height, width }
		}
	}

	return GameObject
})