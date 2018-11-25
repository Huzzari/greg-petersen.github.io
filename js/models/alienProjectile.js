define(["./projectile", "../globals", "../constants"], (Projectile, _globals, _constants) => {
  const { sprites } = _globals
  const { ALIEN_PROJECTILE_HEIGHT, ALIEN_PROJECTILE_WIDTH } = _constants

  return class AlienProjectile extends Projectile {
    constructor(id, x, y, direction) {
      super(id, x, y, ALIEN_PROJECTILE_HEIGHT, ALIEN_PROJECTILE_WIDTH, direction, false, sprites.get("alienProjectile"))
    }
  }
})
