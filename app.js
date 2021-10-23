console.log("hello")
//game area
const gameArea = document.getElementById("canvas")
//movement tracker to determine game edges. not for final product
const movement = document.getElementById("movement")

// may need width and height properties at some point

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

let bob = new player(30, 30, "lightgreen", 12, 12)
console.log("this is the player", bob)

bob.render()
