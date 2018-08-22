define(["./constants"], (_constants) => {
  const {DIRECTION} = _constants

  return {
    PROJECTILE_HEIGHT: 20,
    PROJECTILE_WIDTH: 10,
    projectiles: [
      // Initial Projectile
      {
        size: {
          height: this.PROJECTILE_HEIGHT,
          width: this.PROJECTILE_WIDTH,
        },
        position: {
          x: 30,
          y: 30
        },
        direction: DIRECTION.DOWN
      }
    ]
  }
})

