# 瀑布流布局

## 实现

一般来说主要分为 CSS 实现和 JS 实现

CSS 实现主要是用到一些专门的样式属性，实现起来简单，但是往往会有兼容性问题

JS 实现的方法则不存在这些问题，并且能实现比较个性化的需求，但是实现起来比较麻烦

### column 多列布局方法

column 实现瀑布流主要依赖两个属性

- column-count 属性是设置共有几列
- column-gap 属性是设置每列之间的间隔

### flex 弹性布局方法

flex 实现瀑布流需要给父元素设置为横向排列。然后通过设置 flex-flow: column wrap 使其换⾏

### JS( + 懒加载方法)

在不考虑兼容性或者没有特殊图片展示顺序需求下，只是实现瀑布流的话上面两种方案是够用的。如果要实现一些个性化的需求的话，还是得用 JS

# Reference

- https://codepen.io/iounini/pen/KyYPKe
- https://juejin.cn/post/7094886507730698270#heading-4
- https://juejin.cn/post/7076302847888850957