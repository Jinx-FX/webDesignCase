//获取数据
var list = document.getElementById("list")
var loading = document.getElementById("loadStart")
var loadEnd = document.getElementById("loadEnd")

console.log(list)

function getData () {
  var html = ''
  for (var i = 0; i < 20; i++) {
    html += '<li>我是第' + (i + 1) + '个li</li>'
  }
  var length = list.children.length
  if (length === 0) {
    list.innerHTML = html
  } else if (length > 0 && length < 100) {
    //html是字符串 
    var newHtml = parseDom(html)
    //后面插入元素
    insertAfter(newHtml, list.children[length - 1])
  } else if (length === 100) {
    console.log("已经到底了，别拉了")
    list.style.top = "80px"
    loadEnd.style.top = "40px"
    //加个定时器模拟接口请求结束 隐藏掉此条
    //或者可以插入一条元素 
    setTimeout(() => {
      loadEnd.style.top = "0"
      list.style.top = "40px"
    }, 1000)
  }
}

//字符串dom化
function parseDom (arg) {
  var objEle = document.createElement("div")
  objEle.innerHTML = arg
  return [...objEle.childNodes]
};

//在已有元素后面插入元素
function insertAfter (newElement, targetElement) {
  newElement.forEach(element => {
    //在后面插入元素 js 新的dom api
    targetElement.after(element)
  })
  return
}

//初始加载函数
window.onload = () => {
  //初始请求数据
  getData()
  list.addEventListener("scroll", function () {
    //ul的高度 不变的 定死的
    let listH = list.clientHeight
    //所有li总高度
    let contentH = this.childNodes.length * 41
    //下拉刷新
    if (this.scrollTop === 0) {
      list.style.top = "80px"
      loading.style.top = "40px"
      //刷新数据
      setTimeout(() => {
        loading.style.top = "0"
        list.style.top = "40px"
      }, 1000)
    }
    //距离
    let diffValue = contentH - listH
    console.log(this.scrollTop, diffValue)

    // 上滑加载
    //ul离顶部的距离
    //距离视窗还有50的时候，开始触发；
    if (this.scrollTop + 50 >= diffValue) {
      console.log('该加载了...')
      getData()
    }
  })
}