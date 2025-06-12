// src/sketch.js

import { ellipses, circles, ringConfigs } from './data.js';
import {
  initNoiseSeeds,
  extractRingBaseSizes,      
  extractCircleBaseRadii    
} from './utils.js';
import { Ring } from './Ring.js'; 
import { 
  initEllipseColors,        // initEllipseColors() — Set initial colors for each ellipse to create visual rhythm
  drawEllipses              
} from './ellipsePattern.js';
import { 
  drawCircles               
} from './circlePattern.js';

let rings, ringNoiseSeeds, ringBaseSizes;
let ellipseNoiseSeeds, circleNoiseSeeds, circleBaseRadii;

console.log('⚡ setup running');

function setup() {
  createCanvas(520, 520);          
  angleMode(RADIANS);              
  colorMode(HSB, 360, 100, 100);   

  // —— Setup Rings ——  
  // map() — From ChatGPT, Loop through ring configs and create Ring objects
  rings = ringConfigs.map(cfg => new Ring({
    ...cfg,
    // Optional: use colorSpeed to control gradient animation speed
  }));
  ringBaseSizes  = extractRingBaseSizes(rings);
  ringNoiseSeeds = initNoiseSeeds(rings);

  // —— Setup Ellipses ——  
  initEllipseColors(ellipses);           
  ellipseNoiseSeeds = initNoiseSeeds(ellipses);

  // —— Setup Circles ——  
  circleNoiseSeeds  = initNoiseSeeds(circles);
  circleBaseRadii   = extractCircleBaseRadii(circles);
}

function draw() {
  background('#FFCD41'); 

  // —— Update & Draw Rings ——  
  rings.forEach((r, i) => {
    const n = noise(ringNoiseSeeds[i] + frameCount * 0.005) - 0.5;
    r.r1 = ringBaseSizes[i].r1 + n * 40;
    r.r2 = ringBaseSizes[i].r2 + n * 60;
    r.r3 = ringBaseSizes[i].r3 + n * 80;
    r.display(); 
  });

  // —— Update & Draw Ellipses ——  
  ellipses.forEach((e, i) => {
    e.angle = noise(ellipseNoiseSeeds[i] + frameCount * 0.01) * TWO_PI;
  });
  drawEllipses(ellipses); 

  // —— Draw Circles ——  
  drawCircles(circles, circleNoiseSeeds, circleBaseRadii); // Draw all animated circles
}

// Let p5.js recognize and call setup() and draw()
window.setup = setup; // window.setup — Bind setup to the global scope so p5.js can run it
window.draw  = draw;  // window.draw — Same for draw()
