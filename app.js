let spawnPoint = 0
let spawnRate = 1200
let descent = 3
let playing = false
//game area
const gameArea = document.getElementById("canvas")
console.log(gameArea.width)
console.log(gameArea.height)

const ctx = gameArea.getContext("2d")
function startPrompt() {
  ctx.font = "40px Arial"
  ctx.fillText("Press W to start!", 270, 420)
  ctx.fillStyle = "white"
}
startPrompt()
let startGame = (e) => {
  switch (e.key) {
    case "w":
      ctx.clearRect(0, 0, gameArea.width, gameArea.height)
      let lives = 3
      let score = 0

      //creating game objects
      const bobImg = new Image()
      bobImg.src = "images/PikPng.com_cartoon-squirrel-png_4794521.png"
      function player(url, x, y, color, height, width) {
        this.url = url
        this.x = x
        this.y = y
        this.color = color
        this.height = height
        this.width = width
        this.alive = true
        this.render = function () {
          // ctx.fillStyle = this.color
          ctx.drawImage(this.url, this.x, this.y, this.height, this.width)
        }
      }
      let bob = new player(bobImg, 380, 930, "yellow", 50, 70)

      const acornImg = new Image()
      acornImg.src = "images/pngaaa.com-3533262.png"

      function items(url, x, y, color, height, width, type) {
        this.url = url
        this.x = Math.floor(Math.random() * gameArea.width)
        this.y = y
        this.color = color
        this.height = height
        this.width = width
        this.alive = true
        this.type = "good"
        this.render = function () {
          // ctx.fillStyle = this.color
          ctx.drawImage(this.url, this.x, this.y, this.height, this.width)
        }
      }

      const bombImg = new Image()
      bombImg.src = "images/pngwing.com.png"

      function bombs(url, x, y, color, height, width, type) {
        this.url = url
        this.x = Math.floor(Math.random() * gameArea.width)
        this.y = y
        this.color = color
        this.height = height
        this.width = width
        this.alive = true
        this.type = "bad"
        this.render = function () {
          // ctx.fillStyle = this.color
          ctx.drawImage(this.url, this.x, this.y, this.height, this.width)
        }
      }

      function sound(src) {
        this.sound = document.createElement("audio")
        this.sound.src = src
        this.sound.setAttribute("preload", "auto")
        this.sound.setAttribute("controls", "none")
        this.sound.style.display = "none"
        document.body.appendChild(this.sound)
        this.play = function () {
          this.sound.play()
        }
        this.stop = function () {
          this.sound.pause()
        }
      }

      gotHitSound = new sound("images/Taco Bell Bong - Sound Effect (HD).mp3")

      // game items and character

      // let green = new items(150, 0, "green", 10, 10, "good")
      // let bomb = new bombs(170, 0, "black", 20, 20, "bad")
      console.log("this is the player", bob)

      //X-axis movement
      let BoBmovement = (e) => {
        switch (e.key) {
          case "a":
            bob.x -= 20
            if (bob.x <= 0) {
              bob.x = gameArea.width
            }
            break
          case "d":
            bob.x += 20
            if (bob.x > gameArea.width) {
              bob.x = 0
            }
            break
        }
      }

      // trying to make multiple items

      let itemSpawned = []
      function itemSpawn() {
        setInterval(() => {
          // looking to do random colors
          let green = new items(acornImg, 150, 0, "green", 25, 25, "good")
          itemSpawned.push(green)
        }, 800)
      }

      let bombSpawned = []
      function bombSpawn() {
        setInterval(() => {
          let bomb = new bombs(bombImg, 170, 0, "black", 80, 80, "bad")
          bombSpawned.push(bomb)
        }, 4000)
      }

      itemSpawn()
      bombSpawn()

      console.log(itemSpawned)
      console.log(bombSpawned)

      function scoreTracker() {
        ctx.font = "15px Arial"
        ctx.fillText("Score " + score, 10, 20)
        ctx.fillStyle = "white"
      }

      function lifeTracker() {
        ctx.fillText("Lives " + lives, 10, 40)
        ctx.fillStyle = "white"
      }

      const hitbox = () => {
        for (i = 0; i < itemSpawned.length; i++) {
          if (
            itemSpawned[i].y < bob.y + bob.width &&
            itemSpawned[i].y + itemSpawned[i].height > bob.y &&
            itemSpawned[i].x < bob.x + bob.width &&
            itemSpawned[i].x + itemSpawned[i].width > bob.x
          ) {
            itemSpawned.splice(i,1)
            score++
          }
        }
      }

      console.log("score")

      const bombHit = () => {
        for (i = 0; i < bombSpawned.length; i++) {
          if (
            bombSpawned[i].y < bob.y + bob.width &&
            bombSpawned[i].y + bombSpawned[i].height > bob.y &&
            bombSpawned[i].x < bob.x + bob.width &&
            bombSpawned[i].x + bombSpawned[i].width > bob.x
          ) {
            bombSpawned.splice(i,1)
            gotHitSound.play()
            lives--       
            if (lives === 0) {
              clearInterval(interval)
              ctx.font = "40px Arial"
              ctx.fillText("Game over!", 290, 400)
              ctx.fillStyle = "white"
              ctx.fillText("Press W to play again!", 210, 450)
              ctx.fillStyle = "white"
            }
          }
        }
      }

      //game function
      let gamePlay = () => {
        ctx.clearRect(0, 0, gameArea.width, gameArea.height)
        bob.render()

        itemSpawned.forEach((items) => {
          items.render()
          items.y += descent
        })

        bombSpawned.forEach((bomb) => {
          bomb.render()
          bomb.y += descent
        })

        hitbox()
        bombHit()
        scoreTracker()
        lifeTracker()
        // requestAnimationFrame(gamePlay)
      }
      gamePlay()

      //animation timing
      let interval = setInterval(gamePlay, 10)
      document.addEventListener("keydown", BoBmovement)
      break
  }
}
document.addEventListener("keydown", startGame)

// game starts
//animation runsm time starts
// items in an array
// set loop parameters
