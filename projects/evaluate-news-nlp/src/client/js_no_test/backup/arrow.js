// this canvas draws a curved line followed by an arrow head at the end of
// that line

const canvas = document.getElementById("arrow-canvas");

const c = canvas.getContext("2d");

let width = canvas.width;

let height = canvas.height;

// starting and ending coordinates for the curve

let startX = width * 0.25;

let startY = height * 0.1;

let endX = width * 0.8;

let endY = height * 0.5;

// Controls used for drawing the quadratic curve

let controlX = width * 0.33

let controlY = height * 0.95

// credits to https://gist.github.com/bhtek/a2d545cf4dae316c8329 for calculating
// the angle of and drawing the arrow. Used in arrow function below

let arrowAngle = Math.atan2(controlX - endX, controlY - endY) + Math.PI;

let arrowWidth = 35;

c.lineWidth = 4;

c.strokeStyle = "#81CF9D";

// function animate calls on drawCurvePath which draws a quadratic bezier

let step = 0;

function animate () {

  c.clearRect(0, 0, width, height);

  c.beginPath();

  drawCurvePath(c, startX, startY, endX, endY, controlX, controlY, step);

  c.stroke();

  if (step < 30) {

      requestAnimationFrame(animate);

  }

  // after 30 steps call function to draw an arrow at end of curve

  if (step == 30) {

      drawArrow();

  }

  step ++

}

animate();


// credits to https://developpaper.com/drawing-a-curve-animation-with-canvas/
// for drawCurvePath and quadraticBezier functions

function drawCurvePath (c, startX, startY, endX, endY, controlX, controlY, step) {

  c.moveTo(startX, startY);

  // going from 0% i.e. step = 0 / 30 to 100% i.e. step = 30 / 30, and making
  // iterations of 0.01 to keep a smooth curve

  for (let t = 0; t <= step / 30; t += 0.01) {

    let x = quadraticBezier(startX, controlX, endX, t);
    let y = quadraticBezier(startY, controlY, endY, t);

    c.lineTo(x, y);

  }

  // calculating the new x and y positions in quadratic bezier formula

  function quadraticBezier(start, control, end, t) {

    let k = 1 - t;
    return k * k * start + 2 * (1 - t) * t * control + t * t * end;

  }

}

// setting an increment to determine curve speed of arrow

let increment = 10;

// determine starting location, curve increments and ending location

let firstX = endX - arrowWidth * Math.sin(arrowAngle - Math.PI / 6);
let firstY = endY - arrowWidth * Math.cos(arrowAngle - Math.PI / 6);

// setting initial step increments for first part of the arrow, this will be
// modified after reaching tip of arrow

let stepX = (endX - firstX) / increment;
let stepY = (endY - firstY) / increment;

let lastX = endX - arrowWidth * Math.sin(arrowAngle + Math.PI / 6);
let lastY = endY - arrowWidth * Math.cos(arrowAngle + Math.PI / 6);

// declaring our moving points to trace arrow head

let movingPointX = firstX;

let movingPointY = firstY;

let i = 0;

function drawArrow () {

  if (movingPointY < endY) {

    arrowOne(movingPointX, movingPointY);

    // steps will let movingPoints travel in a downwards-right direction towards
    // the tip of the arrow

    movingPointX += stepX;

    movingPointY += stepY;

    // if we have reached the tip of the arrow, we want to draw the second part
    // But only for the length of the desired increment

  } else if (movingPointY > endY && i < increment) {

    // changing steps to move from tip of arrow in a downwards-left direction

    stepX = (endX - lastX) / increment;

    stepY = (lastY - endY) / increment;

    arrowTwo(movingPointX, movingPointY);

    movingPointX -= stepX;

    movingPointY += stepY;

    i ++

  }

  c.stroke();

  requestAnimationFrame(drawArrow);

}


// declaring two functions to trace first and second part of arrow head

function arrowOne (movingPointX, movingPointY) {

  c.moveTo(firstX, firstY);

  c.lineTo(movingPointX + stepX, movingPointY + stepY);

}

function arrowTwo (movingPointX, movingPointY) {

  c.moveTo(endX, endY);

  c.lineTo(movingPointX - stepX, movingPointY + stepY);

}
