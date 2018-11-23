define(["../constants", "./moveableObject"], (_constants, MoveableObject) => {
	const { DIRECTION, CANVAS_WIDTH } = _constants

	class Alien extends MoveableObject {
		constructor(id, x, y, direction, imageSrc) {
			super(id, x, y, 50, 50, imageSrc)
			this.color = "purple"
			this.directionMoving = direction

			this.moveRight = () => {
				this.lastPosition = { x: this.position.x, y: this.position.y }
				this.directionMoving = DIRECTION.RIGHT
				this.position.x += 10
			}

			this.moveLeft = () => {
				this.lastPosition = { x: this.position.x, y: this.position.y }
				this.directionMoving = DIRECTION.LEFT
				this.position.x -= 10
			}

			this.moveDown = () => {
				this.position.y += 60
			}

			this.canMoveRight = () => {
				return this.position.x + this.size.width < CANVAS_WIDTH
			}

			this.canMoveLeft = () => {
				return this.position.x > 0
			}
		}
	}

	return Alien
})

