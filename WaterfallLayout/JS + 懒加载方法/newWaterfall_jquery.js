/*	 Waterfall Flow Code By: ONEO 2015.08.26
  NewWaterfall Flow Code By: ONEO 2016.10.25
------------------------------------------------------*/
(function () {
  $.fn.NewWaterfall = function (options) {
    // 参数
    let defaults = {
      width: 360,
      delay: 100,
      repeatShow: false
    }
    let config = $.extend({}, defaults, options)
    let ul = this
    // 功能
    let show = function (li) {
      if ($(window).scrollTop() + $(window).height() > $(li).offset().top) {
        $(li).addClass("show")
      } else if ($(window).scrollTop() + $(window).height() < $(li).offset().top) {
        if (config.repeatShow) {
          $(li).removeClass("show")
        }
      }
    }

    let refresh = function () {
      if (ul.length <= 0) {
        return
      }

      ul.css({
        position: "relative"
      })

      // 参数
      let lis = $(ul).children("li")

      if (lis.length <= 0) {
        return
      }

      let ul_width = $(ul).width()
      let ul_column = parseInt(ul_width / config.width)

      if (lis.length < ul_column) {
        ul_column = lis.length
      }

      let li_left = (ul_width - ul_column * config.width) / 2

      if (ul_column > 0) {
        $(ul).removeClass("min")

        // 基础样式设置
        lis.css({
          position: "absolute",
          width: config.width
        })

        // 变量
        let maxHeight = 0
        let list = []
        let nlist = []

        // 初始化列表
        for (let i = 0; i < lis.length; i++) {
          list.push({
            index: i,
            bottom: 0,
            height: $(lis[i]).height()
          })
        }

        // 初始化列
        for (let i = 0; i < ul_column; i++) {
          nlist.push([])
        }

        // 智能排序
        for (let i = 0; i < lis.length; i++) {
          if (i < ul_column) {
            list[i]["bottom"] = list[i]["height"]
            nlist[i].push(list[i])
          } else {
            let b = 0
            let l = 0
            for (let j = 0; j < ul_column; j++) {
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
            $(lis[nlist[i][j]["index"]]).css({
              left: i * config.width + li_left,
              top: nlist[i][j]["bottom"] - nlist[i][j]["height"]
            })
          }
        }

        // 设置最大高度
        for (let i = 0; i < nlist.length; i++) {
          let h = nlist[i][nlist[i].length - 1]["bottom"]
          if (maxHeight < h) {
            maxHeight = h
          }
        }
        $(ul).css("height", maxHeight)
      } else {
        lis.attr("style", "")
        ul.attr("style", "")
        $(ul).addClass("min")
      }

      // 显示列表
      for (let i = 0; i < lis.length; i++) {
        show(lis[i])
      }
    }

    // 刷新
    refresh()
    setInterval(refresh, config.delay)
  }
})()

// 文档加载完毕后执行
$(document).ready(function () {
  $("#waterfall").NewWaterfall({
    // width: 360,
    // delay: 100
  })
})
// 自动加载更多
function random (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}
let loading = false
let dist = 500
let num = 1
setInterval(function () {
  if (
    $(window).scrollTop() >= $(document).height() - $(window).height() - dist &&
    !loading
  ) {
    // 表示开始加载
    loading = true
    // 加载内容
    $("#waterfall").append(
      "<li><div style='height:" + random(50, 300) + "px'>" + num + "</div></li>"
    )
    num++
    // 表示加载结束
    loading = false
  }
}, 60)
