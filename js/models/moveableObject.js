define(["./gameObject"], (GameObject) => {

	class MoveableObject extends GameObject {
		constructor(id, x, y, height, width, imageSrc) {
			super(id, x, y, height, width, imageSrc)
		}
	}

	return MoveableObject
})