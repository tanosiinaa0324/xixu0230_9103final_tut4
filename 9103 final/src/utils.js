// src/utils.js

/**
 * Initializes noise seeds for a list of items.
 *
 * @param {Array} items - Any array of elements; one seed is generated per item.
 * @param {number} range - Maximum random value (default is 1000).
 * @returns {number[]} An array of random seed values, same length as items.
 */
export function initNoiseSeeds(items, range = 1000) {
  return items.map(_ => random(0, range));
}

/**
 * Extracts the base radii (r1, r2, r3) from an array of Ring instances.
 *
 * @param {Ring[]} rings - Array of Ring objects.
 * @returns {{ r1: number, r2: number, r3: number }[]} 
 *   An array of objects containing the original r1, r2, r3 for each ring.
 */
export function extractRingBaseSizes(rings) {
  return rings.map(r => ({ r1: r.r1, r2: r.r2, r3: r.r3 }));
}

/**
 * Extracts the base radius from each circle data object.
 *
 * @param {{ r: number }[]} circles - Array of objects with an 'r' property.
 * @returns {number[]} An array of base radii for each circle.
 */
export function extractCircleBaseRadii(circles) {
  return circles.map(c => c.r);
}
