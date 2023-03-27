// 鼠标拖拽不会选中文字。
document.addEventListener("selectstart", function (e) {
  e.preventDefault()
})

let ggkDom = document.querySelector('#ggk')
let jp = document.querySelector('.jp')
let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext('2d')
ctx.fillStyle = 'darkgray'
ctx.fillRect(0, 0, 400, 100)

let isDraw = false
// 设置isDraw = true,则允许绘制
canvas.onmousedown = function () {
  isDraw = true
}
// 移动的时候绘制圆形，将源图像内的目标内容清除掉
canvas.onmousemove = function (e) {
  if (isDraw) {
    let x = e.pageX - ggkDom.offsetLeft + ggkDom.offsetWidth / 2
    let y = e.pageY - ggkDom.offsetTop
    ctx.beginPath()
    ctx.arc(x, y, 30, 0, 2 * Math.PI)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fill()
    ctx.closePath()
  }
}
document.onmouseup = function () {
  isDraw = false
}

let arr = [
  { content: '一等奖：一个大嘴巴子', p: 0.1 },
  { content: '二等奖：两个大嘴巴子', p: 0.2 },
  { content: '三等奖：三个大嘴巴子', p: 0.5 }
]
let sj = Math.random()
if (sj < arr[0].p) {
  jp.innerHTML = arr[0].content
} else if (sj < arr[1].p) {
  jp.innerHTML = arr[1].content
} else if (sj < arr[2].p) {
  jp.innerHTML = arr[2].content
}
