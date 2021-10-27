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
// let green = new items(150, 0, "green", 10, 10, "good")
let bomb = new bombs(170, 0, "black", 20, 20, "bad")
console.log("this is the player", bob)
// console.log("this is the 1st item", green)

// first stage hit detection

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
console.log(bombSpawned)


function scoreTracker() {
  ctx.fillText("Score " + score, 10, 20)
  ctx.fillStyle = 'white'
}

function lifeTracker() {
  ctx.fillText("Lives " + lives, 10, 40)
  ctx. fillStyle = 'white'
}

const hitbox = () => {
  for (i=0; i<itemSpawned.length; i++) {
    if (
     itemSpawned[i].y < bob.y + bob.width &&
     itemSpawned[i].y + itemSpawned[i].height > bob.y &&
     itemSpawned[i].x < bob.x + bob.width &&
     itemSpawned[i].x + itemSpawned[i].width > bob.x
   ) {
     score ++
    //  green.alive = false
     console.log("hit")
   }
  }

}

console.log('score');

const bombHit = () => {
  for (i = 0; i < bombSpawned.length; i++) {
    if (
      bombSpawned[i].y < bob.y + bob.width &&
      bombSpawned[i].y + bombSpawned[i].height > bob.y &&
      bombSpawned[i].x < bob.x + bob.width &&
      bombSpawned[i].x + bombSpawned[i].width > bob.x
    ) {
      lives --
      console.log("hit bomb")
    }
  }
}

let stop= () => {
  can
}




// console.log(green.alive)

//game function
let gamePlay = () => {
  ctx.clearRect(0, 0, gameArea.width, gameArea.height)
  bob.render()
  // green.render()
  // bomb.render()

  // green.y += descent
  bomb.y += descent
  
  // if (!green.alive) {
    
  // }

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
  // if (lives = 0) {
  //   cancelAnimationFrame(gamePlay)
  // }
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
