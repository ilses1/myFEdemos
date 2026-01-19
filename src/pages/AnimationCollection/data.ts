export interface AnimationItem {
  id: string;
  title: string;
  type: 'button' | 'loader' | 'toggle' | 'card' | 'text' | 'art';
  description: string;
  html: string;
  css: string;
}

export const animations: AnimationItem[] = [
  {
    id: 'gradient-btn',
    title: '渐变流光按钮',
    type: 'button',
    description: '鼠标悬停时背景流光溢彩，带有缩放和阴影效果。',
    html: `<button class="gradient-btn">Hover Me</button>`,
    css: `.gradient-btn {
  background: linear-gradient(45deg, #ff6b6b, #f06595, #cc5de8, #845ef7, #5c7cfa, #339af0, #22b8cf, #20c997, #51cf66, #94d82d, #fcc419, #ff922b);
  background-size: 300% 300%;
  border: none;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  padding: 12px 24px;
  transition: 0.5s;
}

.gradient-btn:hover {
  background-position: right center;
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}`,
  },
  {
    id: 'pulse-btn',
    title: '霓虹脉冲按钮',
    type: 'button',
    description: '悬停时带有发光的脉冲扩散效果，科技感十足。',
    html: `<button class="pulse-btn">Neon Pulse</button>`,
    css: `.pulse-btn {
  background: transparent;
  border: 2px solid #00d2ff;
  border-radius: 6px;
  color: #00d2ff;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;
  position: relative;
  overflow: hidden;
  transition: 0.3s;
}

.pulse-btn:hover {
  background: #00d2ff;
  color: #fff;
  box-shadow: 0 0 10px #00d2ff, 0 0 20px #00d2ff;
}`,
  },
  {
    id: 'push-btn',
    title: '3D 按压按钮',
    type: 'button',
    description: '点击时有真实的下压回弹感，模拟物理按键。',
    html: `<button class="push-btn">Push Me</button>`,
    css: `.push-btn {
  background-color: #4CAF50;
  border: none;
  border-radius: 12px;
  box-shadow: 0 9px #999;
  color: white;
  cursor: pointer;
  font-size: 16px;
  outline: none;
  padding: 15px 25px;
}

.push-btn:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}`,
  },
  {
    id: 'classic-spinner',
    title: '经典旋转圆环',
    type: 'loader',
    description: '简洁的单色旋转圆环，适用于加载状态。',
    html: `<div class="spinner"></div>`,
    css: `.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #09f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}`,
  },
  {
    id: 'bouncing-dots',
    title: '跳动的小球',
    type: 'loader',
    description: '三个小球依次跳动，生动有趣。',
    html: `<div class="bouncing-loader">
  <div></div><div></div><div></div>
</div>`,
    css: `.bouncing-loader {
  display: flex;
  justify-content: center;
}

.bouncing-loader > div {
  width: 10px;
  height: 10px;
  margin: 3px 6px;
  border-radius: 50%;
  background-color: #a3a1a1;
  opacity: 1;
  animation: bouncing-loader 0.6s infinite alternate;
}

.bouncing-loader > div:nth-child(2) { animation-delay: 0.2s; }
.bouncing-loader > div:nth-child(3) { animation-delay: 0.4s; }

@keyframes bouncing-loader {
  to {
    opacity: 0.1;
    transform: translateY(-10px);
  }
}`,
  },
  {
    id: 'wave-loader',
    title: '液体波浪加载',
    type: 'loader',
    description: '像声波一样的条形律动，节奏感强。',
    html: `<div class="wave-loader">
  <div class="wave-bar"></div>
  <div class="wave-bar"></div>
  <div class="wave-bar"></div>
  <div class="wave-bar"></div>
  <div class="wave-bar"></div>
</div>`,
    css: `.wave-loader {
  display: flex;
  align-items: center;
  height: 30px;
}
.wave-bar {
  display: inline-block;
  width: 4px;
  height: 100%;
  margin: 0 2px;
  background-color: #ff5252;
  animation: wave 1s ease-in-out infinite;
}
.wave-bar:nth-child(1) { animation-delay: 0s; }
.wave-bar:nth-child(2) { animation-delay: 0.1s; }
.wave-bar:nth-child(3) { animation-delay: 0.2s; }
.wave-bar:nth-child(4) { animation-delay: 0.3s; }
.wave-bar:nth-child(5) { animation-delay: 0.4s; }

@keyframes wave {
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1); }
}`,
  },
  {
    id: 'theme-toggle-v2',
    title: '精致昼夜开关',
    type: 'toggle',
    description: '带有日月变换和云朵动画的精致开关。',
    html: `<label class="day-night-switch">
  <input type="checkbox" class="dn-checkbox">
  <div class="dn-slider">
    <div class="dn-moon">
      <div class="dn-star dn-star-1"></div>
      <div class="dn-star dn-star-2"></div>
    </div>
    <div class="dn-sun"></div>
    <div class="dn-cloud"></div>
  </div>
</label>`,
    css: `.day-night-switch {
  position: relative;
  display: inline-block;
  width: 70px;
  height: 34px;
}
.dn-checkbox {
  opacity: 0;
  width: 0;
  height: 0;
}
.dn-slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #87CEEB; /* Day Sky */
  transition: .4s;
  border-radius: 34px;
  overflow: hidden;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
}
.dn-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #FFD700; /* Sun */
  transition: .4s;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
}
.dn-checkbox:checked + .dn-slider {
  background-color: #2c3e50; /* Night Sky */
}
.dn-checkbox:checked + .dn-slider:before {
  transform: translateX(36px);
  background-color: #f1c40f; /* Moon */
  box-shadow: inset -4px -2px 0 0px #e67e22; /* Crater */
}
/* Sun Rays / Decoration (Optional simpler version) */
.dn-sun { opacity: 1; transition: 0.4s; }
.dn-checkbox:checked ~ .dn-sun { opacity: 0; }

/* Stars for Night */
.dn-star {
  position: absolute;
  background-color: white;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  opacity: 0;
  transition: 0.4s;
}
.dn-star-1 { top: 8px; left: 15px; }
.dn-star-2 { top: 20px; left: 25px; }

.dn-checkbox:checked + .dn-slider .dn-star {
  opacity: 1;
  animation: twinkle 2s infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Cloud for Day */
.dn-cloud {
  position: absolute;
  top: 15px;
  right: 10px;
  width: 20px;
  height: 8px;
  background: white;
  border-radius: 10px;
  opacity: 0.8;
  transition: 0.4s;
}
.dn-checkbox:checked + .dn-slider .dn-cloud {
  transform: translateX(20px);
  opacity: 0;
}`,
  },
  {
    id: 'glass-card',
    title: '毛玻璃卡片',
    type: 'card',
    description: '流行的毛玻璃效果，背景模糊且带有透光感。',
    html: `<div class="glass-card">
  <h3>Glassmorphism</h3>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</div>`,
    css: `.glass-card {
  width: 200px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #333;
  transition: transform 0.3s;
}
.glass-card h3 {
  margin: 0 0 10px 0;
  color: #333;
}
.glass-card:hover {
  transform: translateY(-5px);
}`,
  },
  {
    id: 'typing-text',
    title: '打字机效果',
    type: 'text',
    description: '模拟打字机逐字显示文本的效果。',
    html: `<div class="typing-text">Hello World...</div>`,
    css: `.typing-text {
  width: 14ch;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid;
  font-family: monospace;
  font-size: 1.2em;
  animation: typing 2s steps(14), blink .5s step-end infinite alternate;
}

@keyframes typing {
  from { width: 0 }
}

@keyframes blink {
  50% { border-color: transparent }
}`,
  },
  {
    id: 'social-share',
    title: '社交分享展开',
    type: 'button',
    description: '悬停时展开显示多个社交图标。',
    html: `<div class="social-share">
  <div class="share-btn">Share</div>
  <div class="social-icons">
    <span>FB</span>
    <span>TW</span>
    <span>IN</span>
  </div>
</div>`,
    css: `.social-share {
  position: relative;
  display: inline-block;
  height: 40px;
}
.share-btn {
  background: #ff4757;
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  z-index: 2;
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
}
.social-icons {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 80px;
  padding-right: 10px;
  background: white;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
  transform: translateX(-20px);
  z-index: 1;
}
.social-icons span {
  margin: 0 8px;
  font-size: 12px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}
.social-share:hover .social-icons {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}`,
  },
  {
    id: 'sleeping-cat',
    title: '慵懒睡猫',
    type: 'art',
    description: '纯 CSS 绘制的呼吸睡眠小猫动画。',
    html: `<div class="cat-container">
  <div class="cat-body"></div>
  <div class="cat-head">
    <div class="cat-ear left"></div>
    <div class="cat-ear right"></div>
    <div class="cat-face">
      <div class="cat-eye left"></div>
      <div class="cat-eye right"></div>
      <div class="cat-nose"></div>
    </div>
  </div>
  <div class="cat-tail"></div>
  <div class="zzz">Z</div>
</div>`,
    css: `.cat-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 20px auto;
}
.cat-body {
  position: absolute;
  width: 80px;
  height: 50px;
  background: #FFAB91;
  border-radius: 50px 50px 20px 20px;
  bottom: 10px;
  left: 10px;
  animation: breathe 3s infinite ease-in-out;
}
.cat-head {
  position: absolute;
  width: 40px;
  height: 35px;
  background: #FFAB91;
  border-radius: 50%;
  bottom: 35px;
  left: 15px;
}
.cat-ear {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 15px solid #FFAB91;
  top: -10px;
}
.cat-ear.left { left: 0; transform: rotate(-15deg); }
.cat-ear.right { right: 0; transform: rotate(15deg); }
.cat-tail {
  position: absolute;
  width: 10px;
  height: 30px;
  background: #FFAB91;
  border-radius: 5px;
  bottom: 15px;
  right: 5px;
  transform-origin: bottom center;
  transform: rotate(45deg);
  animation: tail-wag 3s infinite ease-in-out;
}
.zzz {
  position: absolute;
  top: 0;
  right: 20px;
  font-family: monospace;
  font-weight: bold;
  color: #333;
  opacity: 0;
  animation: sleep 2s infinite;
}

@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
@keyframes tail-wag {
  0%, 100% { transform: rotate(45deg); }
  50% { transform: rotate(25deg); }
}
@keyframes sleep {
  0% { transform: translateY(0) scale(0.5); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-20px) scale(1.2); opacity: 0; }
}`,
  },
  {
    id: 'mountain-sunrise',
    title: '山间日出',
    type: 'art',
    description: '宁静的山景日出动画效果。',
    html: `<div class="scene-container">
  <div class="sky"></div>
  <div class="sun-anim"></div>
  <div class="mountain m-1"></div>
  <div class="mountain m-2"></div>
</div>`,
    css: `.scene-container {
  position: relative;
  width: 150px;
  height: 100px;
  background: #87CEEB;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  animation: sky-change 5s infinite alternate;
}
.sky {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
}
.sun-anim {
  position: absolute;
  width: 30px;
  height: 30px;
  background: #FFD700;
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%);
  bottom: -40px;
  animation: sunrise 5s infinite alternate;
  box-shadow: 0 0 15px #FFD700;
}
.mountain {
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 60px solid #795548;
}
.m-1 { left: -20px; border-bottom-color: #5D4037; z-index: 2; }
.m-2 { right: -20px; border-bottom-color: #4E342E; z-index: 1; transform: scale(1.2); }

@keyframes sunrise {
  0% { bottom: -40px; background: #FF4500; }
  100% { bottom: 60px; background: #FFD700; }
}
@keyframes sky-change {
  0% { background: #2c3e50; }
  100% { background: #87CEEB; }
}`,
  },
  {
    id: 'pixel-invader',
    title: '像素入侵者',
    type: 'art',
    description: '8-bit 风格的像素外星人动画。',
    html: `<div class="pixel-box">
  <div class="invader"></div>
</div>`,
    css: `.pixel-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}
.invader {
  width: 4px;
  height: 4px;
  background: transparent;
  box-shadow: 
    0 0 0 4px #000,
    -8px 4px 0 0 #000, 8px 4px 0 0 #000,
    -12px 8px 0 0 #000, -8px 8px 0 0 #000, -4px 8px 0 0 #000, 0 8px 0 0 #000, 4px 8px 0 0 #000, 8px 8px 0 0 #000, 12px 8px 0 0 #000,
    -16px 12px 0 0 #000, -12px 12px 0 0 #000, -4px 12px 0 0 #000, 4px 12px 0 0 #000, 12px 12px 0 0 #000, 16px 12px 0 0 #000,
    -16px 16px 0 0 #000, -16px 20px 0 0 #000, -4px 16px 0 0 #000, -4px 20px 0 0 #000, 4px 16px 0 0 #000, 4px 20px 0 0 #000, 16px 16px 0 0 #000, 16px 20px 0 0 #000;
  animation: invader-move 1s steps(2) infinite;
}

@keyframes invader-move {
  0% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}`,
  },
];
