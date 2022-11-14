// Based on https://en.wikipedia.org/w/index.php?title=L-system#Example_7:_Fractal_plant

var axiom = 'X'
let rules = {
  X: 'F+[[X]-X]-F[-FX]+X',
  F: 'FF'
}
var t = 0
var lineLength = 100
let angle = Math.PI / 6

function setup () {
  createCanvas(800, 400)
}

function updateAxiom () {
  var newAxiom = ''
  for (let char of axiom) {
    if (char in rules) {
      newAxiom += rules[char]
    } else {
      newAxiom += char
    }
  }

  axiom = newAxiom
}

function drawFern () {
  resetMatrix()
  translate(width / 2, height)

  // F: "draw forward"
  // −: "turn right 25°
  // +: "turn left 25°"
  // [: corresponds to saving the current values for position and angle, which are restored when the corresponding "]" is executed.
  for (let char of axiom) {
    switch (char) {
      case 'F':
        line(0, 0, 0, -lineLength)
        translate(0, -lineLength)
        break
      case '-':
        rotate(-angle)
        break
      case 'X':
        break
      case '+':
        rotate(angle)
        break
      case '[':
        push()
        break
      case ']':
        pop()
        break
    }
  }
}

function draw () {
  background(51)
  stroke(255, 100)

  if (t % 100 == 0) {
    updateAxiom()
    lineLength *= 0.5
  }

  drawFern()

  t += 1
}
