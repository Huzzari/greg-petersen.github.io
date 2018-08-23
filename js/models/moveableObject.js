define(["./gameObject"], (GameObject) => {

	class MoveableObject extends GameObject {
		constructor(x, y, height, width) {
			super(x, y, height, width)
		}
	}

	return MoveableObject
})