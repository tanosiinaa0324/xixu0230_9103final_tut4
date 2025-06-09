// src/sketch.js

import { ellipses, circles, ringConfigs } from './data.js';
import {
  initNoiseSeeds,
  extractRingBaseSizes,
  extractCircleBaseRadii
} from './utils.js';
import { Ring } from './Ring.js';
import { initEllipseColors, drawEllipses } from './ellipsePattern.js';
import { drawCircles } from './circlePattern.js';

let rings, ringNoiseSeeds, ringBaseSizes;
let ellipseNoiseSeeds, circleNoiseSeeds, circleBaseRadii;

console.log('⚡ setup running');

function setup() {
  createCanvas(520, 520);
  angleMode(RADIANS);
  // 用 HSB 方便我们直接传入 hex 颜色做渐变
  colorMode(HSB, 360, 100, 100);

  // —— 初始化 Rings ——  
  rings = ringConfigs.map(cfg => new Ring({
    ...cfg,
    // 可选覆盖渐变速度，比如 0.015
    // colorSpeed: cfg.colorSpeed ?? 0.005
  }));
  ringBaseSizes  = extractRingBaseSizes(rings);
  ringNoiseSeeds = initNoiseSeeds(rings);

  // —— 初始化 Ellipses ——  
  initEllipseColors(ellipses);
  ellipseNoiseSeeds = initNoiseSeeds(ellipses);

  // —— 初始化 Circles ——  
  circleNoiseSeeds  = initNoiseSeeds(circles);
  circleBaseRadii   = extractCircleBaseRadii(circles);
}

function draw() {
  background('#FFCD41');

  // —— 更新 & 绘制 Rings ——  
  rings.forEach((r, i) => {
    // 根据噪声微调半径
    const n = noise(ringNoiseSeeds[i] + frameCount * 0.005) - 0.5;
    r.r1 = ringBaseSizes[i].r1 + n * 40;
    r.r2 = ringBaseSizes[i].r2 + n * 60;
    r.r3 = ringBaseSizes[i].r3 + n * 80;
    // Ring 内部会自动 updateColor() & display()（含悬停逻辑）
    r.display();
  });

  // —— 更新 & 绘制 Ellipses ——  
  ellipses.forEach((e, i) => {
    e.angle = noise(ellipseNoiseSeeds[i] + frameCount * 0.01) * TWO_PI;
  });
  drawEllipses(ellipses);

  // —— 绘制 Circles ——  
  drawCircles(circles, circleNoiseSeeds, circleBaseRadii);
}

// 使 p5.js 能正确识别
window.setup = setup;
window.draw  = draw;
