// src/sketch.js
import { ellipses, circles, ringConfigs } from './data.js';
import { initNoiseSeeds, extractRingBaseSizes, extractCircleBaseRadii } from './utils.js';
import { Ring } from './Ring.js';
import { initEllipseColors, drawEllipses } from './ellipsePattern.js';
import { drawCircles } from './circlePattern.js';

let rings, ringNoiseSeeds, ringBaseSizes;
let ellipseNoiseSeeds, circleNoiseSeeds, circleBaseRadii;

console.log('⚡ setup running');

function setup() {
  createCanvas(520, 520);
  angleMode(RADIANS);
  colorMode(HSB, 360, 100, 100);

  // -- Initialize rings --
  rings = ringConfigs.map(cfg => new Ring(cfg));
  ringBaseSizes  = extractRingBaseSizes(rings);
  ringNoiseSeeds = initNoiseSeeds(rings);

  // —— Initialize Ellipses ——  
  initEllipseColors(ellipses);
  ellipseNoiseSeeds = initNoiseSeeds(ellipses);

  // —— Initialize Circles ——  
  circleNoiseSeeds  = initNoiseSeeds(circles);
  circleBaseRadii   = extractCircleBaseRadii(circles);
}

function draw() {
  background('#2e4760');

  // -- Update and draw rings dynamically --
  rings.forEach((r, i) => {
    const n = noise(ringNoiseSeeds[i] + frameCount * 0.005) - 0.5;
    r.r1 = ringBaseSizes[i].r1 + n * 40;
    r.r2 = ringBaseSizes[i].r2 + n * 60;
    r.r3 = ringBaseSizes[i].r3 + n * 80;
    r.display();
  });

  // -- Update ellipse angles and draw --
  ellipses.forEach((e, i) => {
    e.angle = noise(ellipseNoiseSeeds[i] + frameCount * 0.01) * TWO_PI;
  });
  drawEllipses(ellipses);

  // -- Update ellipse angles and draw --
  drawCircles(circles, circleNoiseSeeds, circleBaseRadii);
}
window.setup = setup;
window.draw  = draw;