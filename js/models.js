define([
  "./models/alien",
  "./models/gameObject.js",
  "./models/moveableObject.js",
  "./models/player.js",
  "./models/playerProjectile.js",
  "./models/alienProjectile.js",
  "./models/projectile.js"
], (Alien, GameObject, MoveableObject, Player, PlayerProjectile, AlienProjectile, Projectile) => {
  return {
    Alien,
    GameObject,
    MoveableObject,
    Player,
    PlayerProjectile,
    AlienProjectile,
    Projectile
  }
})
