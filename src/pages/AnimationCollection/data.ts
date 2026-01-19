export interface AnimationItem {
  id: string;
  title: string;
  type: 'button' | 'loader' | 'toggle' | 'card' | 'text';
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
    id: 'toggle-switch',
    title: '平滑胶囊开关',
    type: 'toggle',
    description: '极简风格的 iOS 风格开关。',
    html: `<label class="toggle-switch">
  <input type="checkbox" class="toggle-input">
  <span class="toggle-slider"></span>
</label>`,
    css: `.toggle-switch {
  position: relative;
  width: 50px;
  height: 26px;
}
.toggle-input { 
  opacity: 0; 
  width: 0; 
  height: 0; 
}
.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}
.toggle-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}
.toggle-input:checked + .toggle-slider {
  background-color: #2196F3;
}
.toggle-input:checked + .toggle-slider:before {
  transform: translateX(24px);
}`,
  },
  {
    id: 'theme-toggle',
    title: '日月切换开关',
    type: 'toggle',
    description: '切换时图标会有旋转和颜色变化，模拟昼夜交替。',
    html: `<label class="theme-toggle">
  <input type="checkbox">
  <span class="theme-slider"></span>
</label>`,
    css: `.theme-toggle {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}
.theme-toggle input { opacity: 0; width: 0; height: 0; }
.theme-slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #87CEEB; /* Sky Blue */
  transition: .4s;
  border-radius: 34px;
}
.theme-slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 3px;
  bottom: 3px;
  background-color: #FFD700; /* Sun Yellow */
  transition: .4s;
  border-radius: 50%;
}
input:checked + .theme-slider {
  background-color: #2c3e50; /* Night Blue */
}
input:checked + .theme-slider:before {
  transform: translateX(30px);
  background-color: #f1c40f; /* Moon Color */
  box-shadow: inset -3px -2px 0 0px #f39c12; /* Crater effect */
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
    id: 'float-action-btn',
    title: '悬浮操作按钮',
    type: 'button',
    description: '点击或悬停时旋转并弹出子菜单。',
    html: `<div class="fab-container">
  <div class="fab-main">+</div>
  <div class="fab-item item-1">A</div>
  <div class="fab-item item-2">B</div>
</div>`,
    css: `.fab-container {
  position: relative;
  width: 50px;
  height: 50px;
}
.fab-main {
  width: 50px;
  height: 50px;
  background: #2ed573;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: transform 0.3s;
}
.fab-item {
  width: 40px;
  height: 40px;
  background: #ffa502;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: 5px;
  left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  opacity: 0;
  z-index: 1;
}
.fab-container:hover .fab-main {
  transform: rotate(45deg);
}
.fab-container:hover .item-1 {
  transform: translateY(-50px);
  opacity: 1;
}
.fab-container:hover .item-2 {
  transform: translateY(-100px);
  opacity: 1;
}`,
  }
];
