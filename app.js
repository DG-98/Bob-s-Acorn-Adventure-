let lives = 3
let score = 0
let spawnPoint = 0
let spawnRate = 1200
let lastSpawn = -1
let descent = 1
//game area
const gameArea = document.getElementById("canvas")
//movement tracker to determine game edges. not for final product
const movement = document.getElementById("movement")

// may need width and height properties at some point
// gameArea.setAttribute("width", getComputedStyle(gameArea)["width"])
// gameArea.setAttribute("height", getComputedStyle(gameArea)["height"])
console.log(gameArea.width)
console.log(gameArea.height)

const ctx = gameArea.getContext("2d")
//creating game objects
function player(x, y, color, height, width) {
  this.x = x
  this.y = y
  this.color = color
  this.height = height
  this.width = width
  this.alive = true
  this.render = function () {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.height, this.width)
  }
}

function items(x, y, color, height, width, type) {
  this.x = Math.floor(Math.random() * gameArea.width)
  this.y = y
  this.color = color
  this.height = height
  this.width = width
  this.alive = true
  this.type = "good"
  this.render = function () {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.height, this.width)
  }
}

function bombs(x, y, color, height, width, type) {
  this.x = Math.floor(Math.random() * gameArea.width)
  this.y = y
  this.color = color
  this.height = height
  this.width = width
  this.alive = true
  this.type = "bad"
  this.render = function () {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.height, this.width)
  }
}

// game items and character
let bob = new player(150, 930, "yellow", 30, 70)
let green = new items(150, 0, "green", 10, 10, "good")
let bomb = new bombs(170, 0, "black", 20, 20, "bad")
console.log("this is the player", bob)
console.log("this is the 1st item", green)

//first stage hit detection
// let hitbox = () => {
//   if (
//     items.y > bob.y + bob.height &&
//     items.y + items.height > bob.y &&
//     items.x < bob.x + bob.width &&
//     items.x + items.width > bob.x
//   ) {
//     items.alive = false
//   }
// }

//X-axis movement
let BoBmovement = (e) => {
  switch (e.key) {
    case "a":
      bob.x -= 10
      if (bob.x <= 0) {
        bob.x = gameArea.width
      }
      break
    case "d":
      bob.x += 10
      if (bob.x > gameArea.width) {
        bob.x = 0
      }
      break
  }
}

// trying to make multiple items

let itemSpawned = []
let itemNum = 6
function itemSpawn() {
  setInterval(() => {
    // looking to do random colors
    let green = new items(150, 0, "green", 25, 25, "good")
    itemSpawned.push(green)
  }, 2000)
}

let bombSpawned = []
function bombSpawn() {
  setInterval(() => {
    let bomb = new bombs(170, 0, "black", 50, 50, "bad")
    bombSpawned.push(bomb)
  }, 6000)
}

itemSpawn()
bombSpawn()

console.log(itemSpawned)
console.log(bombSpawn)

//game function
let gamePlay = () => {
  ctx.clearRect(0, 0, gameArea.width, gameArea.height)
  bob.render()
  green.render()
  bomb.render()

  green.y += descent
  bomb.y += descent
  // first falling item auto movement in relation to animation frame

  // when the item reaches a certain point in the y-axis it will loop back to the top.
  // if (green.y >= 1000) {
  //   green.y = 0
  //   green.x = Math.floor(Math.random() * gameArea.width)
  // }
  itemSpawned.forEach((items) => {
    items.render()
    items.y += descent
  })

  bombSpawned.forEach((bomb) => {
    bomb.render()
    bomb.y += descent
  })

  //   if (bomb.y >= 1000) {
  //     bomb.y = 0
  //     bomb.x = Math.floor(Math.random() * gameArea.width)
  //   }
  requestAnimationFrame(gamePlay)
}
// hitbox()
gamePlay()

//animation timing
// let interval = setInterval(gamePlay, 70)
document.addEventListener("keydown", BoBmovement)

// game starts
//animation runsm time starts
// items in an array
// set loop parameters
