let w = 15;
let rez = 0.003; // Adjusted for smoother noise
let amount = 250; // Maximum distortion strength
let color1 = "#000000"; // Changed to black
let time = 0;
let easing = 0.05; // Easing for smooth delay
let maxDistance; // Maximum distance for mouse influence

let leeway;

let mouseYDelayed = 0.25;
let mouseXDelayed = 0.25;

let mainCanvas; // the main canvas element

function setup() {
  // Select the container where the canvas should be placed
  const container = document.getElementById("canvas-container");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  // Create a canvas that fits within the container
  let canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent("canvas-container"); // Attach canvas to the container

  mainCanvas = createCanvas(windowWidth, windowHeight);

  maxDistance = dist(0, 0, width, height);
  leeway = width / 10;

  // Scale `w` based on the total resolution area relative to 1920x1080
  let baseArea = 1920 * 1080; // Reference resolution area
  let currentArea = width * height; // Current resolution area
  w = 15 * sqrt(currentArea / baseArea); // Adjust w based on the resolution
}

function draw() {
  background("#f5f5f5"); // Off-white background
  mouseXDelayed += (mouseX - mouseXDelayed) * easing;
  mouseYDelayed += (mouseY - mouseYDelayed) * easing;
  makeDistortedDots(
    amount,
    color1,
    rez,
    time,
    maxDistance,
    mouseXDelayed,
    mouseYDelayed
  );
  time += 0.001;
}

function makeDistortedDots(
  amount,
  color,
  rez,
  time,
  maxDistance,
  mouseX,
  mouseY
) {
  stroke(color);
  strokeWeight(2);

  for (let i = -leeway; i < width + leeway; i += w) {
    for (let j = -leeway; j < height + leeway; j += w) {
      if (
        (i < width * 0.35 && j < height * 0.35) ||
        (i > width * 0.65 && j > height * 0.65)
      )
        continue;
      let distance = dist(i, j, mouseX, mouseY);
      let effectStrength = map(distance / 4, 0, maxDistance, -amount / 4, 0);
      point(
        i +
          noise(i * rez, j * rez, time) * amount -
          amount / 2 +
          effectStrength,
        j +
          noise(i * rez, j * rez, time + 100) * amount -
          amount / 2 +
          effectStrength
      );
    }
  }
}

// Adjust the canvas size dynamically if the window is resized
function windowResized() {
  const container = document.getElementById("canvas-container");
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}
