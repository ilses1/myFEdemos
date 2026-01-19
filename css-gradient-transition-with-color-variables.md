## 渐变背景为什么无法直接 transition？以及如何用颜色变量解决

在日常写样式时，我们经常会遇到这样的需求：

- 卡片 hover 时，背景渐变从一组颜色平滑过渡到另一组颜色

很多人第一反应是直接给 `background` 或 `background-image` 加上 `transition`：

```css
.box {
  background-image: linear-gradient(90deg, #1e90ff, #00c9a7);
  transition: background-image 0.4s ease;
}

.box:hover {
  background-image: linear-gradient(90deg, #ff7a18, #af002d);
}
```

结果就是：颜色并不会平滑过渡，而是直接“闪变”到新渐变。这并不是你写错了，而是浏览器本身不支持对渐变图片做插值动画。

本文就围绕这个问题展开：

- 为什么渐变背景无法直接 transition
- 传统的几种解决方案
- 如何通过 CSS 颜色变量配合 `@property` 实现平滑过渡
- 在真实项目中的实战写法

---

## 一、为什么渐变背景 transition 不生效

从 CSS 的语义来看：

- `linear-gradient` 和 `radial-gradient` 是一种“图片函数”
- 当你写 `background-image: linear-gradient(...)` 时，本质是给元素设置了一张由浏览器实时生成的图片

而 CSS 属性的动画能力和它的“类型”强相关：

- 像 `color`、`background-color` 这类颜色属性，浏览器知道它是“颜色”，就可以在两种颜色之间插值
- 像 `transform: translateX(...)` 里的长度、角度、数值等，同理可以插值
- 但对于 `background-image` 这种图片型属性，浏览器只知道这是“两张不同的图片”，并不知道如何从一张图片变成另一张图片

于是就出现了我们看到的现象：

- 写了 `transition: background 0.4s`
- 但是从一个 `linear-gradient(...)` 变成另一个 `linear-gradient(...)` 时，没有中间状态，只是瞬间替换

简单理解：

> 渐变背景本质是图片，浏览器不会帮你在两张图片之间补间动画。

---

## 二、常见的替代方案

在 CSS 支持对渐变直接插值之前，大家主要靠“间接过渡”来实现类似的效果。

### 1. 伪元素叠加 + opacity 过渡

思路：

- 元素本身是渐变 A
- 一个伪元素铺满元素，背景是渐变 B
- 默认伪元素透明，hover 时把伪元素的不透明度从 0 过渡到 1

示例：

```css
.box {
  position: relative;
  z-index: 0;
  background-image: linear-gradient(90deg, #1e90ff, #00c9a7);
  overflow: hidden;
}

.box::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: linear-gradient(90deg, #ff7a18, #af002d);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.box:hover::before {
  opacity: 1;
}
```

优点：

- 兼容性极好，所有现代浏览器都支持
- 过渡足够平滑

缺点：

- 代码稍复杂
- 实际上是两层渐变叠加，控制起来不如“直接改渐变颜色”直观

### 2. 改变渐变的位置或尺寸

如果只是想要“渐变动起来”，可以保持颜色不变，通过 `background-position` 或 `background-size` 动画来制造动态效果。

```css
.box {
  background-image: linear-gradient(90deg, #1e90ff, #00c9a7);
  background-size: 200% 100%;
  background-position: 0% 0;
  transition: background-position 0.4s ease;
}

.box:hover {
  background-position: 100% 0;
}
```

本质是对支持插值的属性做动画，而不是对渐变本身做动画。

---

## 三、用 CSS 颜色变量实现渐变颜色的过渡

真正想做到的是：

- 不再把整个渐变当作一个黑盒子
- 而是把渐变中的“颜色”拆出来，单独作为可以插值的颜色变量

CSS 自定义属性（变量）给了我们这个机会。

### 1. 第一步：用变量替换渐变里的颜色

先把渐变改写成使用颜色变量的形式：

```css
.box {
  --g1: #1e90ff;
  --g2: #00c9a7;

  background-image: linear-gradient(90deg, var(--g1), var(--g2));
}

.box:hover {
  --g1: #ff7a18;
  --g2: #af002d;
}
```

现在渐变中的两个端点颜色分别由 `--g1` 和 `--g2` 控制。

但此时如果你写：

```css
.box {
  transition: --g1 0.4s ease, --g2 0.4s ease;
}
```

大部分浏览器仍然不会对这两个变量做插值，因为默认的 CSS 自定义属性只是字符串，不具备“颜色”的语义。

我们还需要告诉浏览器：

> 这两个变量是 `<color>` 类型，可以做颜色插值。

这就需要用到 CSS Houdini 的 `@property`。

### 2. 第二步：使用 `@property` 注册可动画的颜色变量

通过 `@property` 告诉浏览器变量的类型：

```css
@property --g1 {
  syntax: "<color>";
  inherits: false;
  initial-value: #1e90ff;
}

@property --g2 {
  syntax: "<color>";
  inherits: false;
  initial-value: #00c9a7;
}
```

然后再配合前面的写法：

```css
.box {
  --g1: #1e90ff;
  --g2: #00c9a7;

  background-image: linear-gradient(90deg, var(--g1), var(--g2));
  transition: --g1 0.4s ease, --g2 0.4s ease;
}

.box:hover {
  --g1: #ff7a18;
  --g2: #af002d;
}
```

此时浏览器就可以在两种颜色之间插值，渐变背景也随之平滑过渡。

### 3. 支持多重渐变的情况

在真实项目中，渐变可能并不只有一个。例如：

```css
background:
  linear-gradient(0deg, rgba(255, 239, 212, 0.4), rgba(255, 239, 212, 0.4)),
  radial-gradient(94% 100% at 80% 0%, #ffdFAA 0%, rgba(255, 255, 255, 0) 100%);
```

这里包含了一个线性渐变和一个径向渐变。我们可以分别为这两层里的关键颜色定义变量：

```css
@property --th-linear-color {
  syntax: "<color>";
  inherits: false;
  initial-value: rgba(255, 239, 212, 0.4);
}

@property --th-radial-color {
  syntax: "<color>";
  inherits: false;
  initial-value: #ffdFAA;
}
```

在元素上使用这些变量：

```css
.tableHeader {
  --th-linear-color: rgba(255, 239, 212, 0.4);
  --th-radial-color: #ffdFAA;

  background:
    linear-gradient(0deg, var(--th-linear-color), var(--th-linear-color)),
    radial-gradient(94% 100% at 80% 0%, var(--th-radial-color) 0%, rgba(255, 255, 255, 0) 100%);

  transition: --th-linear-color 0.4s ease, --th-radial-color 0.4s ease;
}

.card:hover .tableHeader {
  --th-linear-color: rgba(255, 212, 212, 0.4);
  --th-radial-color: #ffaaaa;
}
```

这样：

- 未 hover 时是偏暖黄的渐变
- hover 时平滑过渡到偏粉红的渐变
- 视觉上就是“渐变背景在平滑变色”

---

## 四、在 Less 项目中的落地方式

上面的示例是标准 CSS 语法。在使用 Less 等预处理器的项目中，基本写法是完全兼容的。

典型做法是：

1. 在某个样式文件里直接写 `@property` 注册变量
2. 在具体组件的样式中使用这些 CSS 变量

例如在一个页面的 `index.less` 中：

```less
@property --th-linear-color {
  syntax: "<color>";
  inherits: false;
  initial-value: rgba(255, 239, 212, 0.4);
}

@property --th-radial-color {
  syntax: "<color>";
  inherits: false;
  initial-value: #ffdFAA;
}

.tableHeader {
  display: flex;
  margin-top: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ffe7ba;

  --th-linear-color: rgba(255, 239, 212, 0.4);
  --th-radial-color: #ffdFAA;

  background:
    linear-gradient(0deg, var(--th-linear-color), var(--th-linear-color)),
    radial-gradient(94% 100% at 80% 0%, var(--th-radial-color) 0%, rgba(255, 255, 255, 0) 100%);

  transition: --th-linear-color 0.4s ease, --th-radial-color 0.4s ease;
}

.card:hover .tableHeader {
  border-bottom-color: #ffd591;
  --th-linear-color: rgba(255, 212, 212, 0.4);
  --th-radial-color: #ffaaaa;
}
```

这里 Less 只负责预处理，最终编译出来的仍然是标准 CSS，自定义属性和 `@property` 都会完整保留。

---

## 五、兼容性与降级策略

`@property` 是 CSS Houdini 的一部分，目前兼容性大致如下：

- Chrome、Edge、Opera 等 Chromium 系浏览器支持良好
- Safari 新版本已经支持
- Firefox 尚未完全支持该特性

在不支持 `@property` 的浏览器中：

- CSS 自定义属性本身仍然可用
- 但对这些变量的动画不会进行插值，通常会退化成直接跳变

实际项目中比较好的策略是：

- 如果是后台系统、管理平台、内部工具，对浏览器要求相对宽松，可以直接使用该方案，让大部分现代浏览器有更好的视觉效果
- 如果是面向大众用户的产品，可以同时提供一个伪元素加 opacity 的兜底方案，保证在所有浏览器中至少有“看起来还不错”的 hover 效果

---

## 六、小结

1. 渐变背景本质上是“图片”，浏览器默认不会在两张不同渐变图片之间做插值动画，所以对 `background-image: linear-gradient(...)` 直接写 `transition` 通常不会产生平滑过渡。
2. 想要渐变颜色平滑变化，需要把渐变中的颜色拆出来，作为可动画的颜色变量，再让浏览器在这些颜色变量之间插值。
3. 使用 CSS Houdini `@property` 可以为 CSS 自定义属性声明类型为 `<color>`，配合 `transition: --var`，实现渐变颜色的平滑过渡。
4. 在多重渐变的场景下，可以为每一层渐变中的关键颜色定义独立的变量，让复杂的背景在 hover 时仍然保持平滑自然的过渡效果。
5. 对于需要兼容更多浏览器的项目，可以将颜色变量方案视为 progressive enhancement，同时搭配伪元素加 opacity 的传统方案做兜底。

理解了这套原理之后，你在遇到各种“背景渐变想要动起来”的需求时，就不会再被 `transition: background` 这个陷阱困住，而是可以根据场景选择：

- 简单场景用伪元素加 opacity
- 需要精细颜色过渡时，用颜色变量配合 `@property`

从而写出既优雅又可控的渐变动画效果。

