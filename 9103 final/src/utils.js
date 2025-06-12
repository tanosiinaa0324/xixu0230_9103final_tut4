// src/utils.js

/**
 * initNoiseSeeds()
 * Purpose: Generates a Perlin noise seed for each item in the input array.
 * Typically used to introduce variation in animations.
 *
 * @param {Array} items - Any array of elements; one seed is generated per item.
 * @param {number} range - Maximum random value (default is 1000).
 * @returns {number[]} An array of random seed values, same length as items.
 */
export function initNoiseSeeds(items, range = 1000) {
  // map() — From ChatGPT, Iterates over each item to generate a seed
  return items.map(_ => random(0, range)); 
}

/**
 * extractRingBaseSizes()
 * Purpose: Extracts r1, r2, and r3 (radius values) from each Ring object.
 * Useful for restoring original ring size or controlling animation based on base state.
 *
 * @param {Ring[]} rings - Array of Ring objects.
 * @returns {{ r1: number, r2: number, r3: number }[]} 
 *   Array of objects with original radius values for each ring.
 */
export function extractRingBaseSizes(rings) {
  // map() — Iterates over each Ring object and returns an object with r1, r2, r3
  return rings.map(r => ({ r1: r.r1, r2: r.r2, r3: r.r3 }));
}

/**
 * extractCircleBaseRadii()
 * Purpose: Extracts the base radius 'r' from each circle data object.
 * Used to preserve original sizes before animation.
 *
 * @param {{ r: number }[]} circles - Array of objects with an 'r' property.
 * @returns {number[]} An array of base radius values.
 */
export function extractCircleBaseRadii(circles) {
  // map() — Iterates over each circle and returns its radius r
  return circles.map(c => c.r);
}
