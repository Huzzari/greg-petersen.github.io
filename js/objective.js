define(["./aliens", "./player"], (_alien, _player) => {
  const {aliens} = _alien
  const {player} = _player

  const checkIfGameOver = () => {
    if (aliens.length === 0) {
      console.log("Game Over - Player Wins")
      return true
    } else if (!player.isAlive) {
      console.log("Game Over - Aliens Win")
      return true
    }

    return false
  }

  return {
    checkIfGameOver
  }
})
