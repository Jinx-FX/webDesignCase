const waterfall = document.querySelector("#waterfall")

const newWaterfall = (options) => {

  // 参数
  let defaults = {
    width: 360,
    delay: 100,
    repeatShow: false
  }

  let config = defaults

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
    const pics = document.querySelectorAll("li")

    if (pics.length <= 0) return

    let pics_col = parseInt(getClient().width / config.width)

    if (pics.length < pics_col) {
      pics_col = pics.length
    }

    let pic_left = (getClient().width - pics_col * config.width) / 2

    // 基础样式设置
    waterfall.style.position = "relative"

    if (pics_col > 0) {
      waterfall.classList.remove("min")

      // 变量
      let maxHeight = 0
      let list = []
      let nlist = []

      // 初始化列表,基础样式设置 pic
      for (let i = 0; i < pics.length; i++) {
        pics[i].style.position = "absolute"
        pics[i].style.width = config.width + "px"
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
            let jh =
              nlist[j][nlist[j].length - 1]["bottom"] + list[i]["height"]
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
            i * config.width + pic_left + "px"
          pics[nlist[i][j]["index"]].style.top =
            nlist[i][j]["bottom"] - nlist[i][j]["height"] + "px"
        }
      }

      // 设置最大高度
      for (let i = 0; i < nlist.length; i++) {
        let h = nlist[i][nlist[i].length - 1]["bottom"]
        if (maxHeight < h) {
          maxHeight = h
        }
      }
      waterfall.style.height = maxHeight + "px"
    } else {
      waterfall.classList.add("min")
    }

    // 显示列表
    for (let i = 0; i < pics.length; i++) {
      show(pics[i])
    }
  }

  // 刷新
  refresh()
  setInterval(refresh, config.delay)
}

// 文档加载完毕后执行
window.addEventListener("load", newWaterfall)
//当页面尺寸发生变化时，触发函数，实现响应式
window.addEventListener("resize", newWaterfall)

// 自动加载更多
const random = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1))
}

let loading = false
let dist = 500
let num = 1
setInterval(() => {
  if (
    getScrollTop() >= document.documentElement.offsetHeight - getClient().height - dist &&
    !loading
  ) {
    // 表示开始加载
    loading = true
    // 加载内容
    let item = document.createElement('li')
    item.innerHTML = "<div style='height:" + random(50, 300) + "px'>" + num + "</div>"
    waterfall.append(item)
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
