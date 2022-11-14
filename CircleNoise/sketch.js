let radianStep = 3.1415 / 100
let step = 0
let radius = 150
let xOff = 0
let yOff = 0
let wobbleIntensity = 200

function setup () {
  createCanvas(800, 800)
  background(220)
}

function draw () {
  let center = width / 2

  let xWobble = map(
    noise(xOff, 0),
    0,
    1,
    wobbleIntensity / -2,
    wobbleIntensity / 2
  )
  let yWobble = map(
    noise(0, yOff),
    0,
    1,
    wobbleIntensity / -2,
    wobbleIntensity / 2
  )

  ellipse(
    center + radius * cos(step) + xWobble,
    center + radius * sin(step) + yWobble,
    24,
    24
  )
  step += radianStep
  xOff += 0.01
  yOff += 0.01
}
