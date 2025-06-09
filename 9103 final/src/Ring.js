// src/Ring.js

// —— 1. 定义你的渐变调色板 ——  
// 环的背景色会在这几个颜色里平滑过渡
const RING_COLORS = [
  '#FAAF19', '#FFDE9A', 
  '#CEB3D8', '#FFFFFF'
];

export class Ring {
  /**
   * @param {object} cfg
   * @param {number} cfg.x
   * @param {number} cfg.y
   * @param {number} cfg.r1
   * @param {number} cfg.r2
   * @param {number} cfg.r3
   * @param {string[]} cfg.fillStyles      // ['zigzag','dots','layered']
   * @param {string[]} cfg.bgColors        // 背景色 hex 数组
   * @param {Array<string|string[]>} cfg.patternColors
   * @param {boolean} cfg.hasCurve
   * @param {number}  cfg.angle
   * @param {number} [cfg.colorSpeed]      // 可选：统一渐变速度
   */
  constructor(cfg) {
    // — 基础定位和半径 —
    this.x  = cfg.x;
    this.y  = cfg.y;
    this.r0 = 6;               // 最顶小圆半径固定
    this.r1 = cfg.r1;
    this.r2 = cfg.r2;
    this.r3 = cfg.r3;

    // — 原有样式配置 —
    this.fillStyles    = cfg.fillStyles;
    this.bgColors      = cfg.bgColors.map(hex => color(hex));
    this.patternColors = cfg.patternColors.map(layer => {
      return Array.isArray(layer)
        ? layer.map(hex => color(hex))
        : color(layer);
    });
    this.hasCurve = cfg.hasCurve;
    this.angle    = cfg.angle;

    // — 动态渐变色状态 —  
    // 随机初始进度（0~1），打乱同步
    this.transitionProgress = random(0, 1);
    // 随机速度（0.005~0.02）或使用统一 cfg.colorSpeed
    this.transitionSpeed    = cfg.colorSpeed || random(0.005, 0.02);
    // 初始 current 和 target
    this.currentColor = color(random(RING_COLORS));
    this.targetColor  = color(random(RING_COLORS));
  }

  /** 每帧调用：推进并更新 currentColor */
  updateColor() {
    // ① 线性插值
    this.currentColor = lerpColor(
      this.currentColor,
      this.targetColor,
      this.transitionProgress
    );
    // ② 推进过渡进度
    this.transitionProgress += this.transitionSpeed;
    // ③ 完成一次过渡后，固定成目标色，选下一个
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

  /** 每帧调用：除颜色外若有其他更新也可加在这里 */
  update() {
    this.updateColor();
    // 如果你还想让半径或角度受噪声／交互影响，可在这里拓展
  }

  /** 绘制整个 Ring */
  display() {
    // —— 先更新状态 —— 
    this.update();

    noStroke();
    noFill();
    // 画三条“基准”同心圆（无色，仅占位）
    ellipse(this.x, this.y, this.r1 * 2);
    ellipse(this.x, this.y, this.r2 * 2);
    ellipse(this.x, this.y, this.r3 * 2);

    // —— 背景环区用动态色 —— 
    this.drawRegion(this.r0, this.r1, this.fillStyles[0], this.currentColor, this.patternColors[0]);
    this.drawRegion(this.r1, this.r2, this.fillStyles[1], this.currentColor, this.patternColors[1]);
    this.drawRegion(this.r2, this.r3, this.fillStyles[2], this.currentColor, this.patternColors[2]);

    // —— 曲线装饰（若开启） —— 
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

    // —— 最顶小圆 —— 
    noStroke();
    fill(230);
    ellipse(this.x, this.y, this.r0 * 2);
  }

  /**
   * 在两半径间绘制“甜甜圈”区块并叠加 pattern
   * @param {number} iR   内半径
   * @param {number} oR   外半径
   * @param {string} style 'zigzag' | 'dots' | 'layered'
   * @param {p5.Color} bg    背景色
   * @param {p5.Color|p5.Color[]} pc 图案色
   */
  drawRegion(iR, oR, style, bg, pc) {
    noStroke();
    fill(bg);
    this.drawDonut(iR, oR);

    if      (style === 'zigzag')   this.drawZigzagRing(iR, oR, 72, pc);
    else if (style === 'dots')     this.drawDotsRing(iR, oR, 6, pc);
    else if (style === 'layered')  this.drawLayeredRings(iR, oR, pc);
  }

  /** 绘制环状填充（甜甜圈） */
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

  /** 锯齿环（stroke） */
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

  /** 分层同心圈（stroke） */
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

  /** 点环（fill） */
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
