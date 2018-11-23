define(() => {

	class GameObject {
		constructor(id, x, y, height, width, sprite) {
			this.id = id
			this.position = { x, y }
			this.lastPosition = { x: this.position.x, y: this.position.y }
			this.size = { height, width }
			this.requiresUpdate = true
			this.sprite = sprite
		}
	}

	return GameObject
})