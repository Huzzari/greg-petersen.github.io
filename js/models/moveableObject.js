define(["./gameObject"], (GameObject) => {
  return class MoveableObject extends GameObject {
    constructor(id, x, y, height, width, sprite) {
      super(id, x, y, height, width, sprite)
    }
  }
})
