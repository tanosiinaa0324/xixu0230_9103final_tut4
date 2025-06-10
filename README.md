# ✨ 项目名称 / Project Title
Spindle of Dread
——基于Pacita Abad《Wheels of Fortune》的互动再构

## 1. 作品简介 / Description

<!-- 简要介绍你的作品，整体功能和动画效果 -->
在Pacita Abad《Wheels of Fortune》斑斓而狂乱的色块中，我初次看见的不是节日，而是生物。不是祈愿之轮，而是命运的组织体——细胞状、呼吸着、挣扎着的某种东西。

原作使用缤纷色彩缝合出强烈的视觉节奏，但在重绘过程中，我逐渐脱离了原有的庆典语境，开始意识到：当这些图案脱离布面、脱离手工的温度，转而进入数字平面与代码算法的运算时，它们不再是图案，而成为了某种“拟态生命体”。它们仿佛一群无法被命名的微生物，在屏幕上不断分裂、膨胀、呼吸着未知的逻辑。

这是一台不是由齿轮构成的“命运之轮”，而是一枚在暗中蠕动、反复旋转的**“恐惧纺锤（Spindle of Dread）”**——它呼应了柏拉图笔下那枚控制宇宙命运的Spindle of Necessity，却早已褪去理性与秩序的外衣，成为一个渗透着生理性与混沌感的异质装置。

我使用了Perlin noise赋予这些图形以持续波动的动态——如同某种“不均匀的呼吸”，让它们始终处于一种似活非活的状态。颜色则在random的算法中不断更换，但我刻意剔除了某些高饱和度色彩，保留了一组“毒蘑菇般”的迷人却危险的亮色组合——是自然界中“视觉毒性”的警告机制。

而当用户靠近——当鼠标hover触碰这些图案时，它们会像被窥见秘密的生物般迅速收缩，并陷入不规律的抖动之中，颜色转为压抑的深蓝与紫，仿佛正被逼入坏死的边缘。这是一种从“怪物”到“受害体”的反转，一种“命运之物”也会畏惧人类的假设。这一机制模拟了某种生态共震：

不是我们畏惧命运，而是命运也可能在畏惧我们。

这种交互动态并非为了模拟视觉上的“恐怖”，而是构建一种无处不在的异质感：你眼前的东西很美、很鲜艳，却永远不稳定。它活着、它变形、它惊惧、它无法被命名。你靠近的每一步，都是对这“命运轮转体”的扰动与感染。

在这场重构中，我试图将Pacita Abad原作中潜藏的生命性放大，并从“色彩盛宴”中引出一种更深的哲学隐喻：

命运并非机器，而是某种活着的、有情绪的存在。它不再冷酷，而是与你一样，会在凝视中改变。


---

## 2. 交互说明 / How to Use

加载页面后，520×520 的画布会立即出现并自动开始循环动画。作品包含三部分：
Upon loading the page, a 520×520 canvas appears and the looping animation begins automatically. The work consists of three main parts:

渐变环形 / Gradient Rings：基于 Ring.js 提供的多层渐变与点状填充，构建平滑的背景环。
Created using multi-layered gradients and point-like fills from Ring.js, forming soft concentric rings in the background.
旋转椭圆 / Rotating Ellipses：在 ellipsePattern.js 中，椭圆绕各自中心旋转，每个椭圆约 10 秒完成一圈。
Ellipses from ellipsePattern.js rotate around their centers, each taking about 10 seconds per full rotation.
脉动圆圈 / Pulsing Circles：在 circlePattern.js 中，圆圈使用 Perlin 噪声与随机 HSB 颜色脉动，每次脉动周期约 5 秒。
Circles in circlePattern.js pulse rhythmically using Perlin noise and random HSB color shifts, with each cycle lasting around 5 seconds.
动画持续循环，无需任何用户交互；如需体验新的随机效果，只需刷新页面。
The animation loops continuously without user input; refresh the page to generate a new random variation.

🖱️ 鼠标悬停交互 / Hover Interaction
当用户将鼠标悬停在任意图案上时，会触发一系列“拟生物反应”：
When the user hovers the cursor over any shape, it triggers a series of “pseudo-biological responses”:

图案收缩 / Shape Contraction：该图案会立刻使用 lerp() 函数平滑缩小，仿佛生物感知到威胁并蜷缩自身。
The shape smoothly contracts using lerp(), simulating a creature curling in response to perceived danger.
颜色变化 / Color Shift：被悬停的图案颜色变为深蓝、深紫等冷色，模拟失氧或“屏息”的状态。
The hovered shape changes to deep blues and purples, evoking a sensation of suffocation or decay.
不规则抖动 / Irregular Twitching：如鼠标持续悬停，图案会出现轻微抖动，呈现出“痉挛”般的连续反应。
With prolonged hover, the shape starts to tremble irregularly, suggesting spasmodic or nervous response.
这些微观反应为作品赋予了近乎生命的特质，也映射出命运本身的不稳定与敏感性。
These micro-responses lend the work a lifelike presence, reflecting the instability and sensitivity of fate itself.

---

## 3. 个人动画实现思路 / My Animation Approach

- <!-- 你是如何基于小组代码构思实现动画的方法的？你的总体策略是什么？ -->
- 首先在编写小组代码的时候我们一开始是没有进行模块化的。因此在这个阶段我认为我应该先将它重新整理，模块化以适应我的动画设计。
- 然后关于“类生物的节律感”可以用Perlin Noise改变Ring、Circle的的半径来实现，而Ellipse部分则是用Noise来让它们波动，模仿细胞内结构的运动方式。Random主要用于随机改变图像的颜色。考虑到这幅画的颜色鲜艳且丰富，如果让颜色完全随机可能会导致画面杂乱，因此必需限制它在几个颜色之间随机切换。
---

## 4. 动画驱动方式 / Animation Driver

- 驱动方式：<!-- （请选择一项：音频 / 用户交互 / Perlin 噪声 / 时间 / 其它） -->
- Perlin Noise
- 因为我想要模拟生物感，而Perlin Noise是最合适的。
- 简要说明为什么选用这种方式。

---

## 5. 动画的属性与独特性 / Animated Properties & Uniqueness

- 参与动画的图像属性有哪些？（如颜色、尺寸、位置、透明度等）
- 你的动画如何体现独特性，与组员有何区别？主要是利用Perlin Noise和Random改变图像颜色和大小

---

## 6. 灵感来源 / Inspirations

✦ 灵感来源 Inspirations

1. 文献研究与文化象征
Research-based Insights

✿ Pacita Abad 与《Wheels of Fortune》

通过对菲律宾艺术家 Pacita Abad 的研究，我了解到她以大胆的色彩、织物拼贴与 trapunto 技法闻名，善于将个人身份、旅行经验与全球文化融入绘画之中。《Wheels of Fortune》是她晚期的重要作品之一，表面呈现出庆典式的图案与配色，但其强烈的层次感与生命节奏暗藏张力与混乱感，具有高度的开放性解读空间。

✿ “命运之轮”在西方文化中的象征

“Wheel of Fortune”是西方哲学与神话中的核心意象：

在古罗马与中世纪神话中，命运女神 Fortuna 控制着巨轮的转动，轮上之人随之升降，象征人生的无常、权力与悲剧的循环。
在塔罗牌中，“命运之轮”是一张充满能量与不确定性的卡牌，代表不可控的转变与系统性力量的干预。
这种象征常常呈现为非人性、不可对话、理性无法介入的命运力量，带有强烈的超现实或神秘主义色彩。

✿ 柏拉图的“命运之纺锤”（Spindle of Necessity）

在柏拉图《理想国》第十卷中，他描绘了一个宇宙的运转结构——“命运之纺锤”，由三位命运女神掌控，通过八层旋转圆环推动宇宙循环。这个结构既是宇宙机制的隐喻，也象征灵魂在轮回前所见的世界真理。

我将这个哲学结构作为象征借用，并结合作品的异质性发展出“Spindle of Dread（恐惧之纺锤）”的二创概念，既回应了文化典故，也为作品注入了生命感与情绪张力。

2. 个人视觉体验与推导过程
Subjective Perception and Conceptual Development

✿ 第一感知：生物性而非机械性

当我第一次观察原作并以代码重绘时，我并没有把它看作“命运的装置”或节庆的轮盘，而是感受到它更像一团细胞状、有机体般的聚合体。色彩的饱和、构图的密集、图形的重复让我联想到微生物、毒蘑菇、海洋软体生物等充满张力的自然生命体。

![预览图](assets/microorganism.GIF)
![预览图](assets/microorganism2.GIF)

✿ 从“生物感”到“不安”：色彩与运动的转化

这种“不安”令我进一步联想到了一些有名的3D怪物创作，例如德国的艺术家Jonas Pfeiffer根据《圣经》的原文所“复原”的座天使。

![预览图](assets/Seraph.GIF)

这一形象彻底颠覆了传统宗教绘画中对天使的认知，将原本神圣温柔的存在转化为一种全然非人、甚至令人畏惧的生命结构。它不再具备人类的面孔与情感，而更像一种遥远的系统性存在——如同我们无法理解的程序、命令、命运本身。

这种视觉经验给了我重要启发：命运从不以人的面貌存在。它不是自然中的生物，也不是温柔的拟人化神灵，而是一种兼具“异质秩序”与“生理呼吸”的混合体。因此，我的创作也尝试在生物性的表皮之下，包裹住某种机械、抽象、无法沟通的内核——这就是我对“命运实体”的视觉想象。

在视觉与动画设计上，我也参考了《魔法少女小圆》中的部分场景构成。它的“魔女结界”所营造的氛围为我提供了重要启发：这些空间通常拥有强烈的秩序感与节奏性：
![预览图](assets/PuellaMagiMadokaMagica.jpg)
但其内部却是高度混乱、明亮、繁复且夸张的：
![预览图](assets/PuellaMagiMadokaMagica2.jpg)
那种不断重复的图像、拼贴式的运动结构和无法辨识的异质视觉元素，常常令人迷失、焦躁，甚至产生轻度的不适感。这种张力与错乱，正是我在本作品中想要唤起的心理体验之一。

在动态编码过程中，我使用了 Perlin noise 模拟出“不均匀的呼吸”，加入了 random 色彩变化强化“拟生命感”，最终通过 hover 交互植入了“收缩—颤抖—变色”的连续行为，使这些图案看起来像具有情绪反应的生物体。

而这些生物并不友好。它们的颜色鲜艳到失真，它们永远不会稳定，它们感知你的靠近，并表现出防御甚至“坏死”的迹象。不安感由此产生——不是源于视觉暴力，而是一种感知上的紊乱。

✿ 联想深化：命运也是生物体

我逐渐意识到，这种反应机制本身就是一种命运的拟态表达：
命运不再是冷冰冰的轮盘或数学函数，而是一种具有反应性、被凝视即变形的生命体。它会回应你，会呼吸，会恐惧。甚至在某种意义上，

“不是我们在畏惧命运，而是命运也在畏惧我们。”
这种共生性的“恐惧生态”构成了我作品的核心意象，也是《Spindle of Dread》命名与逻辑体系的出发点。

---

## 7. 技术实现说明 / Technical Explanation

- 动画的实现思路（可简要带伪代码/流程图）
- 主要算法或技术点
- 相关参考文献或资料链接（如有）

---

## 8. 组代码的修改 / Changes to Group Code

- 你对小组公共代码做了哪些修改？为什么？
- 我将它按照自己的需求模块化了。原先绘制的时候图案分组已经比较明确，但我进一步把ellipse、circle和ring分开，这样更方便我进行动画效果设置和迭代。
- 以及我删除了原本代码中的/no loop来让图案被循环重绘，这样可以让我的Ring有那种”高速旋转“的效果。
- 

---

## 9. 课外工具与技术 / External Tools & Techniques

- 你用到哪些课程外的库、工具、算法？为什么选择它们？它们原理是什么？
- Lerp。

---

## 10. 网络引用说明 / Online References

- 复制或参考的网络资源/教程/代码段有哪些？它们是怎么实现的？为什么要用？给出链接。

---

## 11. 致谢 / Acknowledgements

- <!-- 可以感谢灵感来源、参考项目、协助的同学等 -->

---

