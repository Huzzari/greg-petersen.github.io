define(() => {
  return class GameObject {
    constructor(id, x, y, height, width, sprite) {
      this.id = id
      this.position = { x, y }
      this.size = { height, width }
      this.sprite = sprite
      this.requiresUpdate = true
      this.isDead = false

      this.lastPosition = { x: this.position.x, y: this.position.y }

      this.updateLastPosition = () => {
        this.lastPosition = { x: this.position.x, y: this.position.y }
      }

      this.die = () => {
        this.requiresUpdate = true
        this.isDead = true
      }
    }
  }
})
