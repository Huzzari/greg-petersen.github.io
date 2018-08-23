define(["../constants", "./moveableObject"], (_constants, MoveableObject) => {
	const { DIRECTION, CANVAS_HEIGHT, PROJECTILE_HEIGHT, PROJECTILE_WIDTH } = _constants

	class Projectile extends MoveableObject {
		constructor(x, y, direction, isPlayers) {
			super(x, y, PROJECTILE_HEIGHT, PROJECTILE_WIDTH)
			this.color = "blue"
			this.direction = direction
			// TODO: Refactor to not be a boolean, but be a TypedEnum for owner
			this.isPlayers = isPlayers

			this.isVisible = () => {
				if (this.position.y + this.size.height < 0) {
					return false
				} else if (this.position.y > CANVAS_HEIGHT) {
					return false
				} else {
					return true
				}
			}

			this.move = () => {
				if (this.direction === DIRECTION.DOWN) {
					this.position.y += 5
				}

				if (this.direction === DIRECTION.UP) {
					this.position.y -= 5
				}
			}
		}
	}

	return Projectile
})

