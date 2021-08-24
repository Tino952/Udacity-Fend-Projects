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

      step = 0;

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


// determine starting and ending location of arrow head

let firstX = endX - arrowWidth * Math.sin(arrowAngle - Math.PI / 6);
let firstY = endY - arrowWidth * Math.cos(arrowAngle - Math.PI / 6);

let lastX = endX - arrowWidth * Math.sin(arrowAngle + Math.PI / 6);
let lastY = endY - arrowWidth * Math.cos(arrowAngle + Math.PI / 6);

let stepLimit = false;

let increment = 10

function drawArrow () {

  // iterating to create first part of arrow head

  if (stepLimit == false && step < increment) {

    myArrow(step, firstX, firstY, endX, endY);

  }

  // resetting step counter after first 10 iterations

  if (step == increment && stepLimit == false) {

    step = 0;

    stepLimit = true;

  }

  // iterating to create second part of arrow head

  if (stepLimit == true && step < increment) {

    myArrow(step, endX, endY, lastX, lastY);

  }

  c.stroke();

  requestAnimationFrame(drawArrow);

  step ++

}

// creating a function to trace the arrow head

function myArrow (step, startX, startY, endX, endY) {

  c.moveTo(startX, startY);

  for (let t = 0; t <= step / 10; t += 0.01) {

    let x = stepFunc(startX, endX, t);
    let y = stepFunc(startY, endY, t);

    c.lineTo(x, y);

  }

}

function stepFunc(first, last, t) {

  let diff = (last - first) * t;

  let output = first + diff;

  return output

}
