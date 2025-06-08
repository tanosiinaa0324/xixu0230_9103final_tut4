// src/Ring.js

export class Ring {
  constructor(cfg) {
    this.x  = cfg.x;
    this.y  = cfg.y;

    // r0 is fixed; r1–r3 are loaded from cfg
    this.r0 = 6;
    this.r1 = cfg.r1;
    this.r2 = cfg.r2;
    this.r3 = cfg.r3;

    this.fillStyles    = cfg.fillStyles;
    // Colors are stored as hex strings and converted to p5.Color in display()
    this.bgColors      = cfg.bgColors.map(hex => color(hex));
    this.patternColors = cfg.patternColors.map(layer => {
      return Array.isArray(layer)
        ? layer.map(hex => color(hex))
        : color(layer);
    });

    this.hasCurve = cfg.hasCurve;
    this.angle    = cfg.angle;
  }

  display() {
    noStroke();
    noFill();
    // Draw three base ellipse
    ellipse(this.x, this.y, this.r1 * 2);
    ellipse(this.x, this.y, this.r2 * 2);
    ellipse(this.x, this.y, this.r3 * 2);

    // Draw the three regions in sequence
    this.drawRegion(this.r0, this.r1, this.fillStyles[0], this.bgColors[0], this.patternColors[0]);
    this.drawRegion(this.r1, this.r2, this.fillStyles[1], this.bgColors[1], this.patternColors[1]);
    this.drawRegion(this.r2, this.r3, this.fillStyles[2], this.bgColors[2], this.patternColors[2]);

    // Curve decoration
    if (this.hasCurve) {
      push();
        translate(this.x, this.y);
        rotate(this.angle);
        stroke('#F35074');
        strokeWeight(4);
        noFill();
        let s = 0.5;
        bezier(
          0, 0,
          65 * s, -18 * s,
          193 * s, -10 * s,
          213 * s,  77 * s
        );
      pop();
    }

    // Draw the topmost small circle
    noStroke();
    fill(230);
    ellipse(this.x, this.y, this.r0 * 2);
  }

  drawRegion(iR, oR, style, bg, pc) {
    noStroke();
    fill(bg);
    this.drawDonut(iR, oR);

    if      (style === 'zigzag')   this.drawZigzagRing(iR, oR, 72, pc);
    else if (style === 'dots')     this.drawDotsRing(iR, oR, 6, pc);
    else if (style === 'layered')  this.drawLayeredRings(iR, oR, pc);
  }

  drawDonut(iR, oR) {
    beginShape();
      for (let a = 0; a < TWO_PI; a += 0.05) {
        vertex(this.x + oR * cos(a), this.y + oR * sin(a));
      }
    beginContour();
      for (let a = TWO_PI; a > 0; a -= 0.05) {
        vertex(this.x + iR * cos(a), this.y + iR * sin(a));
      }
    endContour();
    endShape(CLOSE);
  }

  drawZigzagRing(iR, oR, steps, col) {
    let off = 5;
    stroke(col);
    strokeWeight(1.5);
    noFill();
    beginShape();
      for (let i = 0; i <= steps; i++) {
        let ang = TWO_PI * (i / steps);
        let r   = (i % 2 ? iR + off : oR - off);
        vertex(this.x + r * cos(ang), this.y + r * sin(ang));
      }
    endShape(CLOSE);
  }

  drawLayeredRings(iR, oR, baseColors) {
    let cnt  = 14;
    let pool = [...baseColors];
    while (pool.length < cnt) pool.push(random(baseColors));
    shuffle(pool, true);
    noFill();
    strokeWeight(3);
    for (let i = 0; i < cnt; i++) {
      let t  = i / (cnt - 1);
      let rr = lerp(iR, oR, t);
      stroke(pool[i]);
      ellipse(this.x, this.y, rr * 2);
    }
  }

  drawDotsRing(rMin, rMax, cnt, col) {
    fill(col);
    noStroke();
    let m = 3;
    for (let i = 0; i < cnt; i++) {
      let r    = lerp(rMin + m, rMax - m, i / (cnt - 1));
      let base = floor(r);
      let num  = base + floor(random(-4, 4));
      for (let j = 0; j < num; j++) {
        let ang = TWO_PI * (j / num) + random(-0.05, 0.05);
        let eR  = r + random(-1.2, 1.2);
        let x   = this.x + eR * cos(ang);
        let y   = this.y + eR * sin(ang);
        let sf  = map(eR, rMin, rMax, rMin * 0.03, rMax * 0.018);
        let w   = random(4, 6) * sf;
        let h   = random(3, 5) * sf;
        push();
          translate(x, y);
          rotate(ang + random(-0.3, 0.3));
          ellipse(0, 0, w, h);
        pop();
      }
    }
  }
}
