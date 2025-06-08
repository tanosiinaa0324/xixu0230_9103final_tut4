// src/circlePattern.js

/**
 *  Draws pulsating circles using Perlin noise and random HSB strokes.
 * @param {{x:number,y:number}[]} circles
 * @param {number[]} seeds
 * @param {number[]} baseRadii
 */
export function drawCircles(circles, seeds, baseRadii) {
    noFill();
    strokeWeight(4);
    for (let i = 0; i < circles.length; i++) {
      const c = circles[i];
      const n = noise(seeds[i] + frameCount * 0.02);
      const d = map(n, 0, 1, baseRadii[i], baseRadii[i] * 5);
  
      fill(0, 0, 100);
      const h = random(0, 360),
            s = random(30, 60),
            b = random(30, 60);
      stroke(h, s, b);
  
      ellipse(c.x, c.y, d, d);
    }
  }
  