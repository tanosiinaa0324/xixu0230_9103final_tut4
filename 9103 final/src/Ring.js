// src/Ring.js

// RING_COLORS — color palette for ring gradients
const RING_COLORS = [
  '#FAAF19',
  '#FFDE9A',
  '#CEB3D8',
  '#FFFFFF'
];

export class Ring {
  /**
   * constructor — ring initialization algorithm
   * Purpose: Set up position, three radii, colors, noise seeds, jitter and scale parameters, and hover transition state
   */
  constructor(cfg) {
    // — Position and base radii —  
    this.x  = cfg.x;
    this.y  = cfg.y;
    this.r0 = 6;
    this.r1 = cfg.r1;
    this.r2 = cfg.r2;
    this.r3 = cfg.r3;

    // — Style configuration —  
    this.fillStyles    = cfg.fillStyles;
    this.bgColors      = cfg.bgColors.map(h => color(h));    
    this.patternColors = cfg.patternColors.map(h =>
      Array.isArray(h)
        ? h.map(c => color(c))
        : color(h)
    );
    this.hasCurve = cfg.hasCurve;
    this.angle    = cfg.angle;

    // — Gradient color state —  
    this.transitionProgress = random();                       
    this.transitionSpeed    = cfg.colorSpeed || random(0.005, 0.02);
    this.currentColor       = color(random(RING_COLORS));     
    this.targetColor        = color(random(RING_COLORS));     

    // — Hover detection —  
    this.isHovered = false;

    // — Breathing (scale) noise —  
    this.scaleNoiseOff   = random(1000);
    this.noiseScaleSpeed = cfg.noiseScaleSpeed || 0.005;

    // — Jitter settings —  
    this.jitterSpeed = cfg.jitterSpeed || 0.2;
    this.jitterAmt   = cfg.jitterAmt   || 24;

    // — Smooth scale state —  
    this.currentScale = 1;
    this.scaleSmooth  = cfg.scaleSmooth || 0.1;  // smoothing factor

    // — Hover color transition —  
    this.hoverColor      = cfg.hoverColor
                          ? color(cfg.hoverColor)
                          : color('#2E0854');
    this.hoverBlend      = 0;
    this.hoverBlendSpeed = cfg.hoverBlendSpeed || 0.05;

    // — Other noise seed —  
    this.noiseOffset = random(1000);
  }

  /**
   * updateColor() — gradient transition algorithm
   * Purpose: Interpolate between currentColor and targetColor, and pick a new target when done
   */
  updateColor() {
    this.currentColor = lerpColor(
      this.currentColor,
      this.targetColor,
      this.transitionProgress
    );
    this.transitionProgress += this.transitionSpeed;
    if (this.transitionProgress >= 1) {
      this.currentColor = this.targetColor;
      let next;
      do {
        next = color(random(RING_COLORS));
      } while (next.toString() === this.targetColor.toString());
      this.targetColor        = next;
      this.transitionProgress = 0;
    }
  }

  /**
   * update() — dynamic state update algorithm
   * Purpose: Call updateColor each frame (extendable for more updates)
   */
  update() {
    this.updateColor();
  }

  /**
   * checkHover() — mouse hover detection algorithm
   * Purpose: Compute distance from mouse to ring center and set hover state if within r3
   */
  checkHover() {
    const d = dist(mouseX, mouseY, this.x, this.y);
    this.isHovered = d <= this.r3;
  }

  /**
   * display() — ring drawing algorithm
   * Purpose: Combine state updates, breathing scale, jitter, hover color, and draw
   */
  display() {
    this.update();      // dynamic update
    this.checkHover();  // hover check

    // — hover blend adjustment —  
    this.hoverBlend += this.isHovered
      ? this.hoverBlendSpeed
      : -this.hoverBlendSpeed;
    this.hoverBlend = constrain(this.hoverBlend, 0, 1);

    // 1. compute target scale from noise (breathing)  
    const nScale = noise(this.scaleNoiseOff + frameCount * this.noiseScaleSpeed);
    const targetScale = this.isHovered
      ? map(nScale, 0, 1, 0.5,  0.85)
      : map(nScale, 0, 1, 0.98, 1.02);

    // 2. smoothly interpolate to target scale  
    this.currentScale = lerp(this.currentScale, targetScale, this.scaleSmooth);

    // 3. mix current color and hover color  
    const renderColor = lerpColor(this.currentColor, this.hoverColor, this.hoverBlend);

    // 4. compute radius jitter  
    const j = this.isHovered
      ? (noise(this.noiseOffset + frameCount * this.jitterSpeed) - 0.5) * this.jitterAmt
      : 0;
    const r1j = this.r1 + j;
    const r2j = this.r2 + j;
    const r3j = this.r3 + j;

    push();
      translate(this.x, this.y);
      scale(this.currentScale);

      // placeholder concentric circles  
      noStroke(); noFill();
      ellipse(0, 0, r1j * 2);
      ellipse(0, 0, r2j * 2);
      ellipse(0, 0, r3j * 2);

      // draw three ring regions  
      this.drawRegionRel(this.r0, r1j, this.fillStyles[0], renderColor, this.patternColors[0]);
      this.drawRegionRel(r1j,   r2j, this.fillStyles[1], renderColor, this.patternColors[1]);
      this.drawRegionRel(r2j,   r3j, this.fillStyles[2], renderColor, this.patternColors[2]);

      // draw decorative curve if enabled  
      if (this.hasCurve) {
        push();
          rotate(this.angle);
          stroke('#F35074'); strokeWeight(4); noFill();
          const s2 = 0.5;
          bezier(0,0,65*s2,-18*s2,193*s2,-10*s2,213*s2,77*s2); // Bezier curve
        pop();
      }

      // top center circle  
      noStroke(); fill(230);
      ellipse(0, 0, this.r0 * 2);
    pop();
  }

  /**
   * drawRegionRel() — region drawing algorithm
   * Purpose: Draw a donut-shaped background between two radii and apply a style pattern
   */
  drawRegionRel(iR, oR, style, bg, pc) {
    noStroke();
    fill(bg);
    this.drawDonutRel(iR, oR);

    if      (style === 'zigzag')  this.drawZigzagRel(iR, oR, 72, pc);
    else if (style === 'dots')    this.drawDotsRel  (iR, oR, 6,  pc);
    else if (style === 'layered') this.drawLayeredRel(iR, oR, pc);
  }

  /**
   * drawDonutRel() — donut fill algorithm
   * Purpose: Use shape and contour to draw a filled ring between two radii
   */
  drawDonutRel(iR, oR) {
    beginShape();
      for (let a = 0; a < TWO_PI; a += 0.05) {
        vertex(oR * cos(a), oR * sin(a));
      }
      beginContour();
        for (let a = TWO_PI; a > 0; a -= 0.05) {
          vertex(iR * cos(a), iR * sin(a));
        }
      endContour();
    endShape(CLOSE);
  }

  /**
   * drawZigzagRel() — zigzag edge algorithm
   * Purpose: Draw alternating inner/outer vertices for a jagged border
   */
  drawZigzagRel(iR, oR, steps, col) {
    const off = 5;
    stroke(col);
    strokeWeight(1.5);
    noFill();
    beginShape();
      for (let i = 0; i <= steps; i++) {
        const ang = TWO_PI * (i / steps);
        const r   = (i % 2 ? iR + off : oR - off);
        vertex(r * cos(ang), r * sin(ang));
      }
    endShape(CLOSE);
  }

  /**
   * drawLayeredRel() — layered concentric rings algorithm
   * Purpose: Draw multiple interpolated circles between two radii with random colors
   */
  drawLayeredRel(iR, oR, baseColors) {
    const cnt  = 14;
    const pool = [...baseColors];
    while (pool.length < cnt) pool.push(random(baseColors)); // fill color pool
    shuffle(pool, true);                                   // shuffle() — From team members, randomize array order

    noFill();
    strokeWeight(3);
    for (let i = 0; i < cnt; i++) {
      const t  = i / (cnt - 1);
      const rr = lerp(iR, oR, t);                          // lerp() — From ChatGPT, interpolate radius
      stroke(pool[i]);
      ellipse(0, 0, rr * 2);
    }
  }

  /**
   * drawDotsRel() — dot ring algorithm
   * Purpose: Randomly place small ellipses between two radii to simulate organic texture
   */
  drawDotsRel(rMin, rMax, cnt, col) {
    fill(col);
    noStroke();
    const m = 3;
    for (let i = 0; i < cnt; i++) {
      const r    = lerp(rMin + m, rMax - m, i / (cnt - 1));
      const base = floor(r);
      const num  = base + floor(random(-4, 4));
      for (let j = 0; j < num; j++) {
        const ang = TWO_PI * (j / num) + random(-0.05, 0.05);
        const eR  = r + random(-1.2, 1.2);
        const x   = eR * cos(ang);
        const y   = eR * sin(ang);
        const sf  = map(eR, rMin, rMax, rMin * 0.03, rMax * 0.018);
        const w   = random(4, 6) * sf;
        const h   = random(3, 5) * sf;
        push();                                            
          translate(x, y);
          rotate(ang + random(-0.3, 0.3));
          ellipse(0, 0, w, h);
        pop();                                             
      }
    }
  }
}
