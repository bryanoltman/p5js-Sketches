let xOff = 0
let yOff = 0

var x = 0
var y = 0

function setup () {
  createCanvas(400, 400)
  x = width / 2
  y = height / 2
}

function draw () {
  background(150, 300, 200)

  x += map(noise(xOff, 0), 0, 1, -5, 5)
  y += map(noise(0, yOff), 0, 1, -5, 5)

  xOff += 0.03
  yOff += 0.03

  stroke(0, 0, 0)
  ellipse(x, y, 10, 10)
}
