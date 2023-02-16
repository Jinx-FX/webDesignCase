const waterfall = document.querySelector("#waterfall")
const pics = document.querySelectorAll("li")

console.log(pics.length)

const newWaterfall = (options = {
  width: 360,
  delay: 100,
  repeatShow: false
}) => {

  // 功能
  const show = (pic) => {
    if (getScrollTop() + getClient().height > pic.offsetHeight) {
      pic.classList.add("show")
    } else {
      if (config.repeatShow) {
        pic.classList.remove("show")
      }
    }
  }

  const refresh = () => {
    let pics_col = parseInt(getClient().width / options.width)

    if (pics.length < pics_col) {
      pics_col = pics.length
    }

    // 基础样式设置
    waterfall.style.position = "relative"
    waterfall.classList.remove("min")
    pics.style.position = "absolute"
    pics.style.width = options.width

    // 变量
    let maxHeight = 0
    let list = []
    let nlist = []

    // 初始化列表
    for (let i = 0; i < pics.length; i++) {
      list.push({
        index: i,
        bottom: 0,
        height: pics[i].offsetHeight
      })
    }

    // 初始化列
    for (let i = 0; i < pics_col; i++) {
      nlist.push([])
    }

    // 智能排序
    for (let i = 0; i < pics.length; i++) {
      if (i < pics_col) {
        list[i]["bottom"] = list[i]["height"]
        nlist[i].push(list[i])
      } else {
        let b = 0
        let l = 0
        for (let j = 0; j < pics_col; j++) {
          let jh = nlist[j][nlist[j].length - 1]["bottom"] + list[i]["height"]
          if (b == 0 || jh < b) {
            b = jh
            l = j
          }
        }
        list[i]["bottom"] = b
        nlist[l].push(list[i])
      }
    }

    // 开始布局
    for (let i = 0; i < nlist.length; i++) {
      for (let j = 0; j < nlist[i].length; j++) {
        pics[nlist[i][j]["index"]].style.left =
          i * options.width + pic_left
        pics[nlist[i][j]["index"]].style.top =
          nlist[i][j]["bottom"] - nlist[i][j]["height"]
      }
    }

    // 设置最大高度
    for (let i = 0; i < nlist.length; i++) {
      let h = nlist[i][nlist[i].length - 1]["bottom"]
      if (maxHeight < h) {
        maxHeight = h
      }
    }
    waterfall.style.height = maxHeight

    // 显示列表
    for (let i = 0; i < pics.length; i++) {
      show(pics[i])
    }

  }

  // 刷新
  refresh()
  setInterval(refresh, options.delay)
}

// 文档加载完毕后执行
waterfall.addEventListener("load", newWaterfall)
//当页面尺寸发生变化时，触发函数，实现响应式
waterfall.addEventListener("resize", newWaterfall)

// 自动加载更多
const random = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1))
}

let loading = false
let dist = 500
let num = 1
setInterval(() => {
  if (
    getScrollTop() >= scrollHeight - getClient.height - dist &&
    !loading
  ) {
    // 表示开始加载
    loading = true
    // 加载内容
    waterfall.append(
      "<li><div style='height:" + random(50, 300) + "px'>" + num + "</div></li>"
    )
    num++
    // 表示加载结束
    loading = false
  }
}, 60)

// clientWidth 处理兼容性
const getClient = () => {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}
// scrollTop兼容性处理
const getScrollTop = () => {
  return window.pageYOffset || document.documentElement.scrollTop
}

// document height
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
)