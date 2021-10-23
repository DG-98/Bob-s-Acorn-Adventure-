console.log("hello")
//game area
const gameArea = document.getElementById("canvas")
//movement tracker to determine game edges. not for final product
const movement = document.getElementById("movement")

// may need width and height properties at some point
gameArea.setAttribute("width", getComputedStyle(gameArea)["width"])
gameArea.setAttribute("height", getComputedStyle(gameArea)["height"])
console.log(gameArea.width)

const ctx = gameArea.getContext("2d")

function player(x, y, color, height, width) {
  this.x = x
  this.y = y
  this.color = color
  this.height = height
  this.width = width
  this.alive = true

  this.render = function () {
    ctx.fillstyle = this.color
    ctx.fillRect(this.x, this.y, this.height, this.width)
  }
}
let bob = new player(150, 110, "yellow", 20, 40)
console.log("this is the player", bob)

let gamePlay = () => {
  //   ctx.clearRect(0, 0, gameArea.width, gameArea.height)
  bob.render()
}

let interval = setInterval(gamePlay, 70)
