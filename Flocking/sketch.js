let flock = []
let flockSize = 100
let speedLimit = 3
let maximumSteeringForce = 0.05

class Flocker {
  /**
   * @param {Number} x the starting x coordinate
   * @param {Number} y the starting y coordinate
   */
  constructor (x, y) {
    this.velocity = p5.Vector.random2D()
    this.position = createVector(x, y)
    this.flockerSize = 23
  }

  /**
   * Updates acceleration, velocity, and position based on the other members of the flock
   *
   * @param {[Flocker]} flock the entire flock, including this flocker.
   */
  updateMovement (flock) {
    var acceleration = createVector(0, 0)

    // The strength of the three steering vectors.
    let separationWeight = 2.0
    let alignmentWeight = 1.0
    let coherenceWeight = 1.0

    // Flockers should give each other breathing room
    let separationVector = this.separate(flock)
    separationVector.mult(separationWeight)
    acceleration.add(separationVector)

    // Flockers should go in the same direction
    let alignmentVector = this.align(flock)
    alignmentVector.mult(alignmentWeight)
    acceleration.add(alignmentVector)

    // Flockers should group together
    let coherenceVector = this.cohere(flock)
    coherenceVector.mult(coherenceWeight)
    acceleration.add(coherenceVector)

    this.velocity.add(acceleration)
    this.boundVelocity()

    this.position.add(this.velocity)
    this.boundPosition()
  }

  boundVelocity () {
    this.velocity.limit(speedLimit)
  }

  boundPosition () {
    let flockerRadius = this.flockerSize / 2.0
    if (this.position.x < -flockerRadius) {
      // If we've gone off the left edge of the screen, start over on the right
      this.position.x += width + flockerRadius
    } else if (this.position.x > width + flockerRadius) {
      // If we've gone off the right edge of the screen, start over on the left
      this.position.x -= width + flockerRadius
    }

    if (this.position.y < -flockerRadius) {
      // If we've gone off the top edge of the screen, start over on the bottom
      this.position.y += height + flockerRadius
    } else if (this.position.y > height + flockerRadius) {
      // If we've gone off the bottom edge of the screen, start over on the top
      this.position.y -= height + flockerRadius
    }
  }

  /**
   * Creates an acceleration vector away from too-near flockers.
   *
   * @param {[Flocker]} flock
   *
   * @return {Vector} the separation vector
   */
  separate (flock) {
    let desiredSeparationDistance = 25
    var avoidedFlockerCount = 0
    var steeringVector = createVector(0, 0)

    for (const flocker of flock) {
      let distance = this.position.dist(flocker.position)
      let isTooClose = 0 < distance && distance < desiredSeparationDistance
      if (!isTooClose) {
        continue
      }

      // Subtract to get a avoidance vector
      // ref: https://users.monash.edu/~cema/courses/FIT3094/lecturePDFs/lecture4a_VectorsSteering.pdf
      let diff = p5.Vector.sub(this.position, flocker.position)
      diff.normalize()

      // Weight by distance.
      diff.div(distance)
      steeringVector.add(diff)
      avoidedFlockerCount++
    }

    // Average
    if (avoidedFlockerCount > 0) {
      steeringVector.div(avoidedFlockerCount)
    }

    if (steeringVector.mag() > 0) {
      // Steering = Desired - Velocity
      steeringVector.normalize()
      steeringVector.mult(speedLimit)
      steeringVector.sub(this.velocity)
      steeringVector.limit(maximumSteeringForce)
    }

    return steeringVector
  }

  /**
   * @param {[Flocker]} flock
   *
   * @return {Vector} the alignment vector
   */
  align (flock) {
    var steeringVector = createVector(0, 0)
    return steeringVector
  }

  /**
   * @param {[Flocker]} flock
   *
   * @return {Vector} the coherence vector
   */
  cohere (flock) {
    var steeringVector = createVector(0, 0)
    return steeringVector
  }

  draw () {
    fill(255, 255, 255, 100)
    ellipse(
      // Ensure position is in frame
      this.position.x,
      this.position.y,
      this.flockerSize,
      this.flockerSize
    )
  }
}

function setup () {
  let canvasSize = 800
  createCanvas(canvasSize, canvasSize)

  for (var i = 0; i < flockSize; i++) {
    flock.push(new Flocker(random(canvasSize), random(canvasSize)))
  }
}

function draw () {
  background(50)

  for (const flocker of flock) {
    flocker.updateMovement(flock)
    flocker.draw()
  }
}
