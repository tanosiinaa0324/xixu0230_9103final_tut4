// src/Ring.js

// —— 环颜色渐变池 ——  
const RING_COLORS = [
  '#FAAF19',
  '#FFDE9A',
  '#CEB3D8',
  '#FFFFFF'
];

export class Ring {
  /**
   * @param {object} cfg
   * @param {number} cfg.x
   * @param {number} cfg.y
   * @param {number} cfg.r1
   * @param {number} cfg.r2
   * @param {number} cfg.r3
   * @param {string[]} cfg.fillStyles
   * @param {string[]} cfg.bgColors
   * @param {Array<string>|string} cfg.patternColors
   * @param {boolean}  cfg.hasCurve
   * @param {number}   cfg.angle
   * @param {number}  [cfg.colorSpeed]
   * @param {number}  [cfg.noiseScaleSpeed]
   * @param {number}  [cfg.jitterSpeed]
   * @param {number}  [cfg.jitterAmt]
   * @param {number}  [cfg.scaleSmooth]     // 新增：缩放平滑系数，0～1
   * @param {string}  [cfg.hoverColor]      // 新增：悬停过渡到的颜色
   * @param {number}  [cfg.hoverBlendSpeed] // 新增：颜色过渡速率，0～1
   */
  constructor(cfg) {
    // — 基本定位与半径 —  
    this.x  = cfg.x;
    this.y  = cfg.y;
    this.r0 = 6;
    this.r1 = cfg.r1;
    this.r2 = cfg.r2;
    this.r3 = cfg.r3;

    // — 样式配置 —  
    this.fillStyles    = cfg.fillStyles;
    this.bgColors      = cfg.bgColors.map(h => color(h));
    this.patternColors = cfg.patternColors.map(h =>
      Array.isArray(h)
        ? h.map(c => color(c))
        : color(h)
    );
    this.hasCurve = cfg.hasCurve;
    this.angle    = cfg.angle;

    // — 渐变色动态状态 —  
    this.transitionProgress = random();
    this.transitionSpeed    = cfg.colorSpeed || random(0.005, 0.02);
    this.currentColor       = color(random(RING_COLORS));
    this.targetColor        = color(random(RING_COLORS));

    // — 悬停检测 —  
    this.isHovered = false; // 这个方法来自于询问ChatGPT

    // — 呼吸（scale）噪声 —  
    this.scaleNoiseOff   = random(1000);
    this.noiseScaleSpeed = cfg.noiseScaleSpeed || 0.005;

    // — 抖动配置 —  
    this.jitterSpeed = cfg.jitterSpeed || 0.2;
    this.jitterAmt   = cfg.jitterAmt   || 24;

    // — 缩放平滑状态 —  
    this.currentScale = 1;
    this.scaleSmooth  = cfg.scaleSmooth || 0.1;  // 越小过渡越慢

    // — 新增：悬停颜色过渡状态 —  
    this.hoverColor      = cfg.hoverColor
                          ? color(cfg.hoverColor)
                          : color('#2E0854');
    this.hoverBlend      = 0;
    this.hoverBlendSpeed = cfg.hoverBlendSpeed || 0.05;

    // — 其他噪声种子 —  
    this.noiseOffset = random(1000);
  }

  /** 渐变色推进 */
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

  /** 每帧更新所有动态 */
  update() {
    this.updateColor();
  }

  /** 每帧检测鼠标是否悬停在环内 */
  checkHover() {
    const d = dist(mouseX, mouseY, this.x, this.y);
    this.isHovered = d <= this.r3;
  }

  /** 绘制环体 —— 包含平滑呼吸缩放 & 半径抖动 & 悬停色渐变 */
  display() {
    this.update();
    this.checkHover();

    // —— 更新悬停色混合进度 ——  
    this.hoverBlend += this.isHovered
      ? this.hoverBlendSpeed
      : -this.hoverBlendSpeed;
    this.hoverBlend = constrain(this.hoverBlend, 0, 1);

    // —— 1. 计算目标缩放（Perlin 呼吸） ——  
    const nScale = noise(this.scaleNoiseOff + frameCount * this.noiseScaleSpeed);
    const targetScale = this.isHovered
      ? map(nScale, 0, 1, 0.5,  0.85)
      : map(nScale, 0, 1, 0.98, 1.02);

    // —— 2. 平滑过渡到目标缩放 ——  
    this.currentScale = lerp(this.currentScale, targetScale, this.scaleSmooth);

    // —— 3. 计算渲染用颜色 ——  
    const renderColor = lerpColor(this.currentColor, this.hoverColor, this.hoverBlend);

    // —— 4. 半径抖动 ——  
    const j = this.isHovered
      ? (noise(this.noiseOffset + frameCount * this.jitterSpeed) - 0.5) * this.jitterAmt
      : 0;
    const r1j = this.r1 + j;
    const r2j = this.r2 + j;
    const r3j = this.r3 + j;

    push();
      translate(this.x, this.y);
      scale(this.currentScale);

      // 占位同心圆
      noStroke(); noFill();
      ellipse(0, 0, r1j * 2);
      ellipse(0, 0, r2j * 2);
      ellipse(0, 0, r3j * 2);

      // 三个环区块（背景色用 renderColor）
      this.drawRegionRel(this.r0, r1j, this.fillStyles[0], renderColor, this.patternColors[0]);
      this.drawRegionRel(r1j,   r2j, this.fillStyles[1], renderColor, this.patternColors[1]);
      this.drawRegionRel(r2j,   r3j, this.fillStyles[2], renderColor, this.patternColors[2]);

      // 曲线装饰
      if (this.hasCurve) {
        push();
          rotate(this.angle);
          stroke('#F35074'); strokeWeight(4); noFill();
          const s2 = 0.5;
          bezier(0,0,65*s2,-18*s2,193*s2,-10*s2,213*s2,77*s2);
        pop();
      }

      // 顶层小圆
      noStroke(); fill(230);
      ellipse(0, 0, this.r0 * 2);
    pop();
  }

  /**
   * 在两半径间绘制“甜甜圈”区块并根据 style 叠加图案
   * @param {number} iR   内半径
   * @param {number} oR   外半径（带抖动后的）
   * @param {string} style  'zigzag'|'dots'|'layered'
   * @param {p5.Color} bg  背景色
   * @param {p5.Color|p5.Color[]} pc  图案色
   */
  drawRegionRel(iR, oR, style, bg, pc) {
    noStroke();
    fill(bg);
    this.drawDonutRel(iR, oR);

    if      (style === 'zigzag')  this.drawZigzagRel(iR, oR, 72, pc);
    else if (style === 'dots')    this.drawDotsRel  (iR, oR, 6,  pc);
    else if (style === 'layered') this.drawLayeredRel(iR, oR, pc);
  }

  /** 画一个“甜甜圈”填充 */
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

  /** 锯齿边缘（stroke） */
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

  /** 分层同心圈（stroke） */
  drawLayeredRel(iR, oR, baseColors) {
    const cnt  = 14;
    const pool = [...baseColors];
    while (pool.length < cnt) pool.push(random(baseColors));
    shuffle(pool, true);

    noFill();
    strokeWeight(3);
    for (let i = 0; i < cnt; i++) {
      const t  = i / (cnt - 1);
      const rr = lerp(iR, oR, t);
      stroke(pool[i]);
      ellipse(0, 0, rr * 2);
    }
  }

  /** 点环（fill） */
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
