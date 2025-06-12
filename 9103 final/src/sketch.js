// sketch.js

import { ellipses, circles, ringConfigs } from './data.js';
import {
  initNoiseSeeds,
  extractRingBaseSizes,
  extractCircleBaseRadii
} from './utils.js';
import { Ring } from './Ring.js';
import {
  initEllipseColors,
  drawEllipses
} from './ellipsePattern.js';
import {
  drawCircles
} from './circlePattern.js';

let rings, ringNoiseSeeds, ringBaseSizes;
let ellipseNoiseSeeds;
let circleNoiseSeeds, circleBaseRadii;

function setup() {
  // create full-window canvas
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);
  colorMode(HSB, 360, 100, 100);

  // init rings
  rings = ringConfigs.map(cfg => new Ring({ ...cfg }));
  ringBaseSizes  = extractRingBaseSizes(rings);
  ringNoiseSeeds = initNoiseSeeds(rings);

  // init ellipses
  initEllipseColors(ellipses);
  ellipseNoiseSeeds = initNoiseSeeds(ellipses);

  // init circles
  circleNoiseSeeds  = initNoiseSeeds(circles);
  circleBaseRadii   = extractCircleBaseRadii(circles);
}

function draw() {
  // clear previous frame
  clear();

  // 1. calc scale factor (keep aspect)
  const s       = min(width / 520, height / 520);
  // 2. calc center offset for 520×520 area
  const offsetX = (width  - 520 * s) / 2;
  const offsetY = (height - 520 * s) / 2;
  // 3. map mouse to design space
  const designMouseX = (mouseX - offsetX) / s;
  const designMouseY = (mouseY - offsetY) / s;

  push();
    // move & scale to design area
    translate(offsetX, offsetY);
    scale(s);

    // draw background square
    noStroke();
    fill('#FFCD41');
    rect(0, 0, 520, 520);

    // apply clipping to keep drawing inside square
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(0, 0, 520, 520);
    drawingContext.clip();

    // backup & override mouse for hover checks
    const prevMouseX = window.mouseX;
    const prevMouseY = window.mouseY;
    window.mouseX = designMouseX;
    window.mouseY = designMouseY;

    // update & draw rings
    rings.forEach((r, i) => {
      const n = noise(ringNoiseSeeds[i] + frameCount * 0.005) - 0.5;
      r.r1 = ringBaseSizes[i].r1 + n * 40;
      r.r2 = ringBaseSizes[i].r2 + n * 60;
      r.r3 = ringBaseSizes[i].r3 + n * 80;
      r.display();
    });

    // restore mouse
    window.mouseX = prevMouseX;
    window.mouseY = prevMouseY;

    // update & draw ellipses
    ellipses.forEach((e, i) => {
      e.angle = noise(ellipseNoiseSeeds[i] + frameCount * 0.01) * TWO_PI;
    });
    drawEllipses(ellipses);

    // draw circles
    drawCircles(circles, circleNoiseSeeds, circleBaseRadii);

    // restore context (end clipping)
    drawingContext.restore();
  pop();
}

function windowResized() {
  // resize canvas on window change
  resizeCanvas(windowWidth, windowHeight);
}

// bind to global so p5.js can call
window.setup         = setup;
window.draw          = draw;
window.windowResized = windowResized;
