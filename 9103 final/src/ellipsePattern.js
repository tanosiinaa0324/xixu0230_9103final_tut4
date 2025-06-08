// src/ellipsePattern.js
import { fillColors } from './data.js';

/**
 * Assigns a fill color to each ellipse in the array
 * @param {{fillColor:null}[]} list
 */
export function initEllipseColors(list) {
  let idx = 0;
  for (const e of list) {
    e.fillColor = fillColors[idx++ % fillColors.length];
  }
}

/**
 * Draws all ellipses using their current rotation angle (e.angle)
 * @param {{x:number,y:number,angle:number,fillColor:string}[]} list
 */
export function drawEllipses(list) {
  stroke('#F28633');
  strokeWeight(1);
  for (const e of list) {
    fill(e.fillColor);
    push();
      translate(e.x, e.y);
      rotate(e.angle);
      ellipse(0, 0, 5, 11);
    pop();
  }
}
