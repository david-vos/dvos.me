let w = 15;
let rez = 0.003; // Adjusted for smoother noise
let amount = 250; // Maximum distortion strength
let color1 = '#ffffff';
let time = 0;
let easing = 0.05; // Easing for smooth delay
let maxDistance; // Maximum distance for mouse influence

let leeway;

let mouseYDelayed = 0.25;
let mouseXDelayed = 0.25;

let mainCanvas;   // the main canvas element
let grainBuffer;  // the graphics buffer to be layered onto the main canvas
let grainShader;  // the shader
let shouldAnimate = true 

const frag = `
precision highp float;
varying vec2 vVertTexCoord;

uniform sampler2D source;
uniform float noiseSeed;
uniform float noiseAmount;

// Noise functions
// https://github.com/patriciogonzalezvivo/lygia/blob/main/generative/random.glsl
float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

void main() {
    // GorillaSun's grain algorithm
    vec4 inColor = texture2D(source, vVertTexCoord);
    gl_FragColor = clamp(inColor + vec4(
        mix(-noiseAmount, noiseAmount, fract(noiseSeed + rand(vVertTexCoord * 1234.5678))),
        mix(-noiseAmount, noiseAmount, fract(noiseSeed + rand(vVertTexCoord * 876.54321))),
        mix(-noiseAmount, noiseAmount, fract(noiseSeed + rand(vVertTexCoord * 3214.5678))),
        0.
    ), 0., 1.);
}
`

const vert = `
precision highp float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
varying vec2 vVertTexCoord;

void main(void) {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
  vVertTexCoord = aTexCoord;
}
`

function setup() {
  // Select the container where the canvas should be placed
  const container = document.getElementById('canvas-container');
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  // Create a canvas that fits within the container
  let canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent('canvas-container'); // Attach canvas to the container
  noCursor();

  mainCanvas = createCanvas(windowWidth, windowHeight);
  grainBuffer = createGraphics(width, height, WEBGL);
  grainShader = grainBuffer.createShader(vert, frag);

  maxDistance = dist(0, 0, width, height);
  leeway = width / 10;

 // Scale `w` based on the total resolution area relative to 1920x1080
  let baseArea = 1920 * 1080; // Reference resolution area
  let currentArea = width * height; // Current resolution area
  w = 15 * sqrt(currentArea / baseArea); // Adjust w based on the resolution
}

function draw() {
  background('#000000');
  mouseXDelayed += (mouseX - mouseXDelayed) * easing;
  mouseYDelayed += (mouseY - mouseYDelayed) * easing;
  makeDistortedDots(amount, color1, rez, time, maxDistance, mouseXDelayed, mouseYDelayed);
  applyGrain();
  time += 0.001;
}

function makeDistortedDots(amount, color, rez, time, maxDistance, mouseX, mouseY) {
  stroke(color);
  strokeWeight(2);

  for (let i = -leeway; i < width + leeway; i += w) {
    for (let j = -leeway; j < height + leeway; j += w) {
      if ((i < width * 0.35 && j < height * 0.35) || (i > width * 0.65 && j > height * 0.65)) continue;
      let distance = dist(i, j, mouseX, mouseY);
      let effectStrength = map(distance/4, 0, maxDistance, -amount / 4, 0);
      point(
        i + (noise(i * rez, j * rez, time) * amount) - amount / 2 + effectStrength,
        j + (noise(i * rez, j * rez, time + 100) * amount) - amount / 2 + effectStrength
      );
    }
  }
}

// Adjust the canvas size dynamically if the window is resized
function windowResized() {
  const container = document.getElementById('canvas-container');
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}

function applyGrain() {
    grainBuffer.clear();
    grainBuffer.reset();
    grainBuffer.push();
    grainBuffer.shader(grainShader);
    grainShader.setUniform('source', mainCanvas);
    grainShader.setUniform('noiseAmount', 0.22);
    grainBuffer.rectMode(CENTER);
    grainBuffer.noStroke();
    grainBuffer.rect(0, 0, width, height);
    grainBuffer.pop();

    clear();
    push();
    image(grainBuffer, 0, 0);
    pop();
}

document.addEventListener("DOMContentLoaded", () => {
  const cursorBall = document.querySelector(".cursor-ball");
  const cursorOutline = document.querySelector(".cursor-outline");
  const links = document.querySelectorAll(".social-links a");

  let mouseX = 0, mouseY = 0; // Mouse position
  let cursorX = 0, cursorY = 0; // Cursor outline position
  const easing = 0.1; // Adjust easing for smoother movement

  // Ensure elements exist before adding event listeners
  if (cursorBall && cursorOutline) {
    document.addEventListener("mousemove", (e) => {
      // Directly move the cursor-ball for instant response
      mouseX = e.pageX;
      mouseY = e.pageY;

      cursorBall.style.top = `${mouseY}px`;
      cursorBall.style.left = `${mouseX}px`;
    });

    function animateCursor() {
      // Smoothly interpolate the cursorOutline position
      cursorX += (mouseX - cursorX) * easing;
      cursorY += (mouseY - cursorY) * easing;

      cursorOutline.style.top = `${cursorY}px`;
      cursorOutline.style.left = `${cursorX}px`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener("mousedown", (e) => {
      if (e.button === 0) {
        cursorOutline.classList.add("cursor-mousedown");
      }
    });

    document.addEventListener("mouseup", () => {
      cursorOutline.classList.remove("cursor-mousedown");
    });

    links.forEach((link) => {
      link.addEventListener("mouseover", () => {
        cursorOutline.classList.add("scale-link");
        link.classList.add("hovered-link");

        link.addEventListener("mouseleave", () => {
          cursorOutline.classList.remove("scale-link");
          link.classList.remove("hovered-link");
        });
      });
    });
  } else {
    console.error("Cursor elements not found in the DOM.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Map of navigation elements and their corresponding text sections
  const navMapping = {
    "nav-home": "main-text-home",
    "nav-about": "main-text-about",
    "nav-projects": "main-text-projects",
    "nav-inspiration": "main-text-inspiration",
    "nav-contact": "main-text-contact"
  };

  // Get all nav elements
  const navItems = document.querySelectorAll(".nav-container a");

  // Function to update active styles for the nav menu
  const updateNavStyles = (activeNavClass) => {
    navItems.forEach(navItem => {
      if (navItem.classList.contains(activeNavClass)) {
       navItem.classList.add("active-nav");
       navItem.classList.remove("inactive-nav");
      } else {
       navItem.classList.add("inactive-nav");
       navItem.classList.remove("active-nav"); 
      }
    });
  };

  // Attach event listeners to each nav item
  navItems.forEach(navItem => {
    navItem.addEventListener("click", () => {
      // Get the ID of the corresponding text section
      const targetId = navMapping[navItem.classList[0]];
      
      if (targetId) {
        // Hide all main text sections
        Object.values(navMapping).forEach(id => {
          const section = document.getElementById(id);
          if (section) {
            section.style.display = "none";
          }
        });

        // Show the selected text section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.style.display = "block";
        }

        // Update navigation menu styles
        updateNavStyles(navItem.classList[0]);
      }
    });
  });

  // Set default active section (optional)
  const defaultNavClass = "nav-home";
  document.querySelector(`.${defaultNavClass}`).click();
});

