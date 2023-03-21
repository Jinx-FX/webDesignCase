// 定义requestAnimFrame函数
window.requestAnimFrame = function () {
  // 检查浏览器是否支持requestAnimFrame函数
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    // 如果所有这些选项都不可用，使用设置超时来调用回调函数
    function (callback) {
      window.setTimeout(callback)
    }
  )
}


// 初始化函数，获取 canvas 元素并返回相关信息
function init (elemid) {
  let canvas = document.getElementById(elemid)
  // 获取 2d 绘图上下文
  c = canvas.getContext("2d")
  // 设置 canvas 宽度为窗口内宽度，高度为窗口内高度
  w = (canvas.width = window.innerWidth)
  h = (canvas.height = window.innerHeight)
  // 设置填充样式填充整个 canvas, 且半透明黑
  c.fillRect(0, 0, w, h)
  c.fillStyle = "rgba(30,30,30,1)"
  return { c: c, canvas: canvas }
}

// 等待页面加载完成后执行函数
window.onload = function () {
  // 获取绘图上下文和canvas元素
  let { c, canvas } = init("canvas"),
    // 设置canvas的宽度为窗口内宽度，高度为窗口内高度
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight),
    // 初始化鼠标对象
    mouse = { x: false, y: false },
    last_mouse = {}

  // 计算两点距离
  function dist (p1x, p1y, p2x, p2y) {
    return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2))
  }

  class Segment {
    /**
     * 
     * @param {*} parent 上一个segment对象
     * @param {*} len 长度
     * @param {*} ang 角度
     * @param {*} first 判断是否第一条触手
     * 如果是第一条触手段，则位置坐标为触手顶部位置
     * 否则位置坐标为上一个 segment 对象的 nextPos 坐标
     */
    constructor(parent, len, ang, first) {
      this.first = first
      if (first) {
        this.pos = {
          x: parent.x,
          y: parent.y
        }
      } else {
        this.pos = {
          x: parent.nextPos.x,
          y: parent.nextPos.y
        }
      }
      this.len = len
      this.ang = ang
      // 计算下一个 segment坐标位置
      this.nextPos = {
        x: this.pox.x + this.len * Math.cos(this.ang),
        y: this.pox.y + this.len * Math.cos(this.ang),
      }
    }

    /**
     * 
     * @param {*} t 目标点
     * 更新位置
     */
    update (t) {
      // 计算 segment 与目标点的角度
      this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x)
      // 根据目标点和角度更新位置坐标
      this.pos.x = t.x + this.len * Math.cos(this.ang - Math.PI)
      this.pos.y = t.y + this.len * Math.cos(this.ang - Math.PI)
      // 根据新的位置做吧更新 nextPos 坐标
      this.nextPos.x = this.pos.x + this.len * Math.cos(this.ang)
      this.nextPos.y = this.pos.y + this.len * Math.cos(this.ang)
    }

    /**
     * 
     * @param {*} t 目标点
     * 返回初始位置 
     */
    fallback (t) {
      this.pos.x = t.x
      this.pos.y = t.y
      this.nextPos.x = this.pos.x + this.len * Math.cos(this.ang)
      this.nextPos.y = this.pos.y + this.len * Math.cos(this.ang)
    }

    show () {
      c.lineTo(this.nextPos.x, this.nextPos.y)
    }
  }

  class Tentacle {
    /**
     * 
     * @param {*} x x坐标
     * @param {*} y y坐标
     * @param {*} len 触手长度
     * @param {*} n 触手段数
     * @param {*} ang 角度
     */
    constructor(x, y, len, n, ang) {
      this.x = x
      this.y = y
      this.len = len
      this.n = n
      // 初始化触手的目标点对象
      this.t = {}
      this.rand = Math.random()
      // 创建触手的第一条段
      this.segments = [new Segment(this, this.len / this.n, 0, true)]
      // 创建其他的段
      for (let i = 1; i < this.n; i++) {
        this.segments.push(
          new Segment(this.segments[i - 1], this.len / this.n, 0, false)
        )
      }
    }

    /**
     * 
     * @param {*} last_target 最新的目标点
     * @param {*} target 目标点
     * 移动触手到目标点
     */
    move (last_target, target) {
      // 计算触手顶部和目标点的角度
      this.ang = Math.atan2(target.y - this.y, target.x - this.x)
      // 计算触手的距离参数
      this.dt = dist(last_target.x, last_target.y, target.x, target.y)
      this.t = {
        x: target.x - 0.8 * this.dt * Math.cos(this.ang),
        y: target.y - 0.8 * this.dt * Math.cos(this.ang),
      }
      // 如果计算出了目标点，则更新最后一个 segment 对象的位置坐标
      // 否则，更新最后u一个 segment 对象的位置坐标为目标点坐标
      if (this.t.x) {
        this.segments[this.n - 1].update(this.t)
      } else {
        this.segments[this.n - 1].update(this.t)
      }
      // 遍历所有 segment 对象，更新它们的位置坐标
      for (let i = this.n - 2; i >= 0; i--) {
        this.segments[i].update(this.segments[i + 1].pos)
      }
      if (
        dist(this.x, this.y, target.x, target.y) <=
        this.len + dist(last_target.x, last_target.y, target.x, target.y)
      ) {
        this.segments[0].fallback({ x: this.x, y: this.y })
        for (let i = 1; i < this.n; i++) {
          this.segments[i].fallback(this.segments[i - 1].nextPos)
        }
      }
    }

    show (target) {
      // 如果触手与目标点的距离小于触手的长度
      if (dist(this.x, this.y, target.x, target.y) <= this.len) {
        // 设置全局合成操作为 lghter
        c.globalCompositeOperation = "lighter"
        // 开始新路径
        c.beginPath()
        // 从触手起始位置开始绘制线条
        c.moveTo(this.x, this.y)
        // 遍历所有的 segment 对象，并使用它们的 show 方法绘制线条
        for (let i = 0; i < this.n; i++) {
          this.segments[i].show()
        }
        // 设置线条样式
        c.strokeStyle = "hsl(" + (this.rand * 60 + 180) +
          ",100%," + (this.rand * 60 + 25) + "%)"
        // 设置线条宽度
        c.lineWidth = this.rand * 2
        // 设置线条端点样式
        c.lineCap = "round"
        // 设置线条连接处样式
        c.lineJoin = "round"
        // 绘制线条
        c.stroke()
        // 设置全局合成操作为 source-over
        c.globalCompositeOperation = "source-over"
      }
    }

    // 绘制触手的圆形头的方法
    show_round (target) {
      // 开始新路径
      c.beginPath()
      // 如果出搜与目标点的距离小于触手的长度，则绘制白色的圆形
      // 否则绘制青色的圆形
      if (dist(this.x, this.y, target.x, target.y) <= this.len) {
        c.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI)
        c.fillStyle = "whith"
      } else {
        c.arc(this.x, this.y, 2 * this.rand, 0, 2 * Math.PI)
        c.fillStyle = "darkcyan"
      }
      // 填充圆形
      c.fill()
    }
  }

  // 初始化变量
  let maxlen = 400,
    minlen = 50
}