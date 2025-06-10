# ✨ Spindle of Dread
**An Interactive Reimagination of Pacita Abad’s _Wheels of Fortune_**

![Final Preview](assets/Final.GIF)

---

## 1. Project Description

In Pacita Abad’s vibrant and chaotic _Wheels of Fortune_, what I first perceived wasn’t festivity—but life. Not a wheel of prayer, but an organism of fate: cellular, breathing, and writhing with alien logic.

![Original Work](assets/%20WheelsOfFortune.jpg)  
_Original: Wheels of Fortune by Pacita Abad_

While the original quilted piece evokes celebration through vivid color rhythms, my digital reinterpretation detaches these motifs from fabric and human touch. Once translated into code and digital space, these visuals cease to be decorative—they become **simulacra of living organisms**. They morph into nameless microorganisms that divide, swell, and pulse with a logic foreign to human understanding.

![Code Interpretation](assets/Original.JPG)
_The image after redrawing with code_

This is not a wheel powered by gears. This is a recursive, squirming spindle of fate—**the Spindle of Dread**. Inspired by Plato’s *Spindle of Necessity* which governed cosmic order, this version strips away rationality, emerging instead as a visceral, chaotic, and quasi-biological entity.

Using **Perlin noise**, I gave the shapes an irregular "breathing" quality, keeping them in a liminal state between motion and stasis. A handpicked palette mimics the look of poisonous fungi—beautiful yet unsettling. When hovered, the shapes recoil, twitch, and darken to deep blues and purples—signaling panic or necrosis. This interaction implies a reversal:

> Not that we fear fate—but that fate might fear us.

This isn't horror by spectacle. It is subtle, invasive disquiet—produced by proximity and observation. You aren’t just watching a wheel spin. You’re disturbing a system that feels.

---

## 2. How to Use

Upon loading the page, users are presented with a 520×520 animation canvas.

Key behaviors:
- Concentric rings pulsate using gradients
- Elliptical shapes rotate irregularly
- Circles expand and contract rhythmically

🖱️ **Interactive Hover**
- Hover over any shape to trigger:
  - Contraction (shrinking)
  - Twitching motion
  - Color shift to dark purples/blues

Each refresh produces a unique output. No clicks or buttons—just visual immersion and reaction.

---

## 3. My Animation Approach

### Code Modularization
Originally part of a group project in a single `sketch.js`, I refactored the code into modular files:
- `Ring.js`
- `EllipsePattern.js`
- `CirclePattern.js`

### 🌀 Rhythmic Motion
- **Perlin noise** drives:
  - Radius breathing
  - Angular wobble
  - Organic distortions

### 🎨 Controlled Chaos
- Used `random()` within a curated palette
- Avoided overly saturated or clashing colors
- Targeted a visual balance between vibrancy and discomfort

### ⚙️ Key Techniques
- `lerpColor()` for color gradients
- `clamp()` for value safety
- Class-based encapsulation for modular animation
- `randomSeed()` for reproducibility

### 🚀 Next Steps
Introduce deeper interactivity:
- Mouse click: switch themes or behaviors
- Cursor position: affect speed, growth, or tension

---

## 4. Animation Driver: Perlin Noise + Randomness

### Dual Strategy
- **Perlin noise** = organic flow (breathing, rotation)
- **Random** = dynamic disruption (color flicker)

Together they:
- Simulate life-like unpredictability
- Maintain controlled beauty with natural evolution
- Allow dynamic yet coherent visual experience

---

## 5. Animated Properties & Uniqueness

My animation stands out because it feels **alive**.

- Shapes **breathe** and **pulse** with Perlin noise
- Colors **shift unpredictably** but stay within bounds
- Forms **react emotionally** through hover-triggered behaviors

Compared to static or reactive-only animations, mine simulates **responsive living systems**—evocative of microbial or alien life.

---

## 6. Inspirations

### 🎨 Cultural & Philosophical
- **Pacita Abad’s Wheels of Fortune**: Hidden tension beneath celebration
- **Wheel of Fortune** in Western culture: Fortuna’s cycle of rise/fall, divine unpredictability
- **Plato’s Spindle of Necessity**: A metaphysical device controlling cosmic fate

My reinterpretation—**Spindle of Dread**—imagines fate as:
> A reactive, emotional entity—not a cold mechanism.

### 👁️ Visual Derivations

#### From Biology:
- Microorganisms, fungi, deep-sea life
- Bio-inspired patterns of tension and motion

![Microorganism Refs](assets/microorganism.GIF)
![Microorganism Refs 2](assets/microorganism2.GIF)

#### From Myth & Horror:
- Jonas Pfeiffer’s Biblical Seraph reconstruction
- Uncanny beings with systemic, non-human logic

![Seraph Reference](assets/Seraph.GIF)
_Republished by rednote user 9506977597, http://xhslink.com/a/2jhVTVX30QCeb_

#### From Anime:
- *Puella Magi Madoka Magica*: Magical space aesthetic
- Order and chaos coexisting in "witch barrier" dimensions

![Madoka Reference](assets/PuellaMagiMadokaMagica.jpg)
![Madoka Reference 2](assets/PuellaMagiMadokaMagica2.jpg)

This informed my goal: **make beauty unstable**. Create shapes that resist naming, living yet unknowable. Where interactivity feels like intrusion.

---

## 7. Technical Explanation

### 🎞️ Workflow
1. Load static shape configs
2. Initialize Ring, Circle, Ellipse objects
3. Animate per frame:
   - Apply Perlin noise to angles & sizes
   - Apply random color choices
   - Redraw canvas with layered behaviors

### 🧠 Key Algorithms

| Technique                | Purpose                                     | Visual Effect                               |
|--------------------------|---------------------------------------------|---------------------------------------------|
| Perlin noise             | Control motion, breathing, angle distortion | Smooth, organic movement                    |
| random()                 | Change color dynamically                    | Prevent monotony, add rhythm                |
| sin() / cos()            | Radial drawing of petals & rings            | Rhythmic, rotational symmetry               |
| lerpColor()              | Smooth color gradients                      | Layered aura, glowing motion                |
| clamp()                  | Value safety for radius/angle               | Prevents visual chaos                       |
| Modular class structure  | Shape separation                            | Easy scaling and focused animation logic    |
| Layered rendering        | Multi-shape display                         | Visual depth and complexity                 |

---

## 8. Changes to Group Code

- Split shapes into separate class files
- Removed `noLoop()` to enable constant animation
- Refactored drawing logic for modular testing
- Added hover interactivity and conditional color shifts

---

## 9. 📦 External Tools & Techniques

### 1. `lerpColor()` – Smooth Color Interpolation *(Beyond Course Scope)*

Although `lerp()` (linear interpolation) is commonly used, in this project I specifically applied **p5.js’s `lerpColor()`** function to generate smooth color transitions. This method was not included in the course material—it was introduced to me via a suggestion from ChatGPT.

#### ✨ Why I Chose It
I wanted the rotating ring shapes (`Ring` objects) to display fluid color gradients that resembled glowing or energetic auras. Simply using `random()` caused abrupt and jarring color changes. By contrast, `lerpColor()` enabled continuous, natural transitions between hues, creating a more immersive and aesthetically pleasing animation.

#### ⚙️ How It Works
The function `lerpColor(c1, c2, amt)` returns a color between `c1` and `c2`, where `amt` is a value between 0.0 and 1.0. Internally, it linearly interpolates each color channel (in RGB or HSB), creating a seamless blend.

**Formula:**  
`result = (1 - amt) * c1 + amt * c2` (applied per channel)

#### 🧪 Example Code

![Preview](assets/LerpColorSample.png)

#### 🎨 Real Use Case
In my `Ring` class, I applied this same technique to transition through multiple colors as each ring rotated, enhancing the sense of motion, depth, and emotional intensity.

---

### 2. `clamp()` – Value Bounding Utility *(Custom Function)*

The `clamp()` function is a fundamental math utility that ensures a value stays within a specified range. I implemented it to stabilize properties like radii, angles, and Perlin-noise-driven values. This function was also generated with the help of ChatGPT.

#### ✨ Why I Chose It
Dynamic values—especially when driven by noise or randomness—can easily drift outside desired visual limits. This often leads to objects that are oversized, distorted, or visually broken. By clamping those values, I ensured visual consistency and avoided instability in the animation.

#### ⚙️ How It Works
`clamp(value, min, max)` returns:
- `min` if `value < min`
- `max` if `value > max`
- `value` if within range

This ensures that the output always stays inside `[min, max]`.

#### 🧪 Example Code

![Preview](assets/ClampSample.png)

#### 🔧 Real Use Case
In both the `Ring` and `CirclePattern` modules, I used `clamp()` to limit radius growth and suppress excessive jitter. This helped maintain compositional balance even under intense motion or transformation.

---

## 10. 🔁 Iterative Development & Refinement

### 1. 📦 Initial Version – Autonomous Animation Only

![Preview](assets/Iteration1.GIF)

In early user testing, I noticed that while the original deep blue background contributed to a feeling of pressure and unease, it also made some viewers feel excessively uncomfortable. I then switched the background to a brighter mustard yellow and tweaked the color palette—removing overly saturated and visually jarring options.

These changes gave the work a more vibrant appearance, reminiscent of tropical fungi or deep-sea organisms with “toxic warning” coloration. The discomfort wasn't reduced—instead, it became more subtle and unsettling, masked behind deceptively cheerful colors and spasmodic reactions.

At the same time, I realized that the animation felt slightly monotonous when observed passively. The lack of interaction made the "creatures" seem robotic, as if executing a preset loop rather than reacting to stimuli. I decided to introduce a simple **hover interaction** to break this artificial feeling.

> 💡 When the user hovers the mouse over any `Ring`, it immediately contracts, mimicking a creature’s instinctive recoil when startled or touched.

---

### 2. 👆 Second Iteration – Hover Interaction Implemented

![Preview](assets/Iteration2.GIF)

Adding hover-based contraction brought more life into the rings and introduced a reactive element. However, I soon realized the emotion still lacked intensity. The contraction alone resembled a twitch, but failed to convey deeper discomfort or distress.

To amplify the emotional expression, I combined `random()` and `lerpColor()`—so that the rings not only shrank when hovered, but also shifted color toward deep blues and purples. This created the impression of **suffocation or near-death**, heightening the overall anxiety embedded in the visual language.

---

### 3. ✅ Final Iteration – Complete Emotional and Interactive Layer

![Preview](assets/Final.GIF)

This final iteration represents the complete integration of visual evolution, interactivity, and emotional depth. The combination of dynamic color shifts, recoil motion, and unsettling vibrancy achieves my intended effect: an artwork that’s both mesmerizing and quietly disturbing.
