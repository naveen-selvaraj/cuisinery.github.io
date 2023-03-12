var stage = document.querySelector('canvas'),
  cb = stage.getBoundingClientRect(),
  ctx = stage.getContext('2d'),
  ratio = window.devicePixelRatio || 5,
  mouse = {
    x: 0,
    y: 0
  },
  dots = [],
  wide = 36,
  high = wide / 2.2,
  size = 40,
  padding = 40

/*******************************************************************************
  Events
*******************************************************************************/

window.onmousemove = function(e) {
  mouse.x = e.pageX * ratio;
  mouse.y = e.pageY * ratio;
}

window.onresize = function() {
  ctx.canvas.width = window.innerWidth * ratio;
  ctx.canvas.height = window.innerHeight * ratio;
  cb = stage.getBoundingClientRect();
}

window.onresize();

/*******************************************************************************
  Setup
*******************************************************************************/

function create() {
  var d = 10;
  for (var i = -1; ++i < wide;) {
    var x = Math.floor((((cb.width - padding * 2) / (wide - 1)) * i) + padding) * ratio;

    for (var j = -1; ++j < high;) {

      var y = Math.floor((((cb.height - padding * 2) / (high - 1)) * j) + padding) * ratio;

      dots.push({
        x: x,
        y: y,
        ox: x,
        oy: y
      });
    }
  }
}

create();


/*******************************************************************************
  Rendering and frame calculations
*******************************************************************************/

function render() {
  // clear the canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // choose the dot color
  ctx.fillStyle = 'rgba(189,189,189 ,1)';

  // for each line
  for (var i = 0; i < dots.length; i++) {
    var s = dots[i];

    var v = getV(s)

    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x + v.x, s.y + v.y);
    ctx.strokeStyle = 'transparent'
    ctx.lineWidth = .1 * ratio
    ctx.stroke();
    ctx.closePath();
  }

  // for each dot
  for (var i = 0; i < dots.length; i++) {
    var s = dots[i];

    var v = getV(s)

    ctx.circle(s.x + v.x, s.y + v.y, s.size * ratio, true);
    ctx.fill();
  }

}

function getV(dot) {
  // find the distance from the line to the mouse
  var d = getDistance(dot, mouse);

  // reverse the distance, so that the number is bigger when the mouse is closer.
  dot.size = (200 - d) / 35
  dot.size = dot.size < 1 ? 1 : dot.size;

  dot.angle = getAngle(dot, mouse);

  return {
    x: (d > 20 ? 20 : d) * Math.cos(dot.angle * Math.PI / 180),
    y: (d > 20 ? 20 : d) * Math.sin(dot.angle * Math.PI / 180)
  }
}

function getAngle(obj1, obj2) {
  var dX = obj2.x - obj1.x;
  var dY = obj2.y - obj1.y;
  var angleDeg = Math.atan2(dY, dX) / Math.PI * 180;
  return angleDeg;
}

function getDistance(obj1, obj2) {
  var dx = obj1.x - obj2.x;
  var dy = obj1.y - obj2.y;
  return Math.sqrt(dx * dx + dy * dy);
}


/*******************************************************************************
  Drawing circles
*******************************************************************************/

CanvasRenderingContext2D.prototype.circle = function(x, y, r) {
  this.beginPath();
  this.arc(x, y, r, 0, 2 * Math.PI, false);
  this.closePath();
}

/*******************************************************************************
  Animation Setup
*******************************************************************************/

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

(function animloop() {

  render();

  requestAnimationFrame(animloop);

})();