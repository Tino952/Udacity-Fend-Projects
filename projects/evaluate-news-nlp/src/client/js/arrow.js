// Make a test animation for line to travel across screen slowly
// Maybe use set interval


const canvas = document.getElementById("arrow-canvas");

const c = canvas.getContext("2d");

let width = canvas.width;

let height = canvas.height;

let startX = width * 0.25;

let startY = height * 0.1;

let endX = width * 0.8;

let endY = height * 0.5;

let controlX = width * 0.33

let controlY = height * 0.95

let step = 0;

// credits to https://gist.github.com/bhtek/a2d545cf4dae316c8329 for drawing arrow head

let arrowAngle = Math.atan2(controlX - endX, controlY - endY) + Math.PI;

let arrowWidth = 35;

c.lineWidth = 4;

c.strokeStyle = "#81CF9D";


function animate () {

  c.clearRect(0, 0, width, height);

  c.beginPath();

  drawCurvePath(c, startX, startY, endX, endY, controlX, controlY, step);

  c.stroke();

  step = (step + 1) % 100;

  if (step < 99) {

      requestAnimationFrame(animate);

  } else if (step == 99) {

      drawArrow();

  }

}

animate();

function drawCurvePath (c, startX, startY, endX, endY, controlX, controlY, step) {

  c.moveTo(startX, startY);

  for (let t = 0; t <= step / 100; t += 0.01) {

    let x = quadraticBezier(startX, controlX, endX, t);
    let y = quadraticBezier(startY, controlY, endY, t);

    c.lineTo(x, y);

  }


  function quadraticBezier(start, control, end, t) {

    let k = 1 - t;
    return k * k * start + 2 * (1 - t) * t * control + t * t * end;

  }

}

let increment = 1000

function drawArrow () {

  c.clearRect(0, 0, width, height);

  c.beginPath();

  c.moveTo(startX, startY);

  c.quadraticCurveTo(controlX, controlY, endX, endY)

  let firstX = endX - arrowWidth * Math.sin(arrowAngle - Math.PI / 6);
  let firstY = endY - arrowWidth * Math.cos(arrowAngle - Math.PI / 6);

  let stepX = (endX - firstX) / increment;
  let stepY = (endY - firstY) / increment;

  let lastX = arrowWidth * Math.sin(arrowAngle + Math.PI / 6);
  let lastY = arrowWidth * Math.cos(arrowAngle + Math.PI / 6);

  c.moveTo(firstX, firstY);

  for (let i = 0; i < increment; i ++) {

    c.lineTo(firstX + stepX, firstY + stepY)

    firstX += stepX;

    firstY += stepY;

  }

  c.stroke();

  requestAnimationFrame(drawArrow);

}


function arrow (endX, endY, arrowWidth, arrowAngle) {

  c.moveTo(endX - (arrowWidth * Math.sin(arrowAngle - Math.PI / 6)),
          endY - (arrowWidth * Math.cos(arrowAngle - Math.PI / 6)));

  c.lineTo(endX, endY);

  c.lineTo(endX - (arrowWidth * Math.sin(arrowAngle + Math.PI / 6)),
          endY - (arrowWidth * Math.cos(arrowAngle + Math.PI / 6)))

  c.stroke();

}
