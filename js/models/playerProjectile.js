define(["./projectile", "../globals", "../constants"], (Projectile, _globals, _constants) => {
  const { sprites } = _globals
  const { PLAYER_PROJECTILE_WIDTH, PLAYER_PROJECTILE_HEIGHT } = _constants

  return class PlayerProjectile extends Projectile {
    constructor(id, x, y, direction) {
      super(
        id,
        x,
        y,
        PLAYER_PROJECTILE_HEIGHT,
        PLAYER_PROJECTILE_WIDTH,
        direction,
        true,
        sprites.get("playerProjectile")
      )
    }
  }
})
