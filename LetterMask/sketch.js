let maskGraphics
let mainGraphics

let canvasWidth = 700
let canvasHeight = 300

function setup () {
  createCanvas(canvasWidth, canvasHeight)

  mainGraphics = createGraphics(canvasWidth, canvasHeight)

  maskGraphics = createGraphics(canvasWidth, canvasHeight)

  maskGraphics.textAlign(CENTER, CENTER)
  maskGraphics.textSize(250)
  maskGraphics.textStyle('bold')
  maskGraphics.background(0, 0, 0, 0)
  maskGraphics.fill(255)
  maskGraphics.text('violet', width / 2, height / 2)
  maskGraphics.filter(BLUR, 5)
}

function createSparkles (numSparkles) {
  let ellipseSize = 4

  mainGraphics.fill(155, 38, 182)
  mainGraphics.noStroke()
  for (let i = 0; i < numSparkles; i++) {
    let x = random(0, width)
    let y = random(0, height)
    mainGraphics.ellipse(x, y, ellipseSize, ellipseSize)
  }
}

function draw () {
  background(0)
  mainGraphics.background(0, 1)

  createSparkles(500)

  mainGraphics.filter(BLUR, 1)
  masked = mainGraphics.get()
  masked.mask(maskGraphics)

  image(masked, 0, 0)
}
