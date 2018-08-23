define(() => {
	// Change this to mute sounds for development
	let muted = true

	class Sound {
		constructor(src) {
			this.sound = document.createElement("audio")
			this.sound.src = src
			this.sound.setAttribute("preload", "auto")
			this.sound.setAttribute("controls", "none")
			this.sound.style.display = "none"
			document.body.appendChild(this.sound)
			this.play = function () {
				if (!muted) {
					this.sound.play()
				}
			}
			this.stop = function () {
				this.sound.pause()
			}
		}
	}

	return {
		shoot: new Sound("sounds/shoot.wav"),
		alien_death: new Sound("sounds/invaderkilled.wav"),
		one: new Sound("sounds/fastinvader1.wav"),
		two: new Sound("sounds/fastinvader2.wav"),
		three: new Sound("sounds/fastinvader3.wav"),
		four: new Sound("sounds/fastinvader4.wav")
	}
})
