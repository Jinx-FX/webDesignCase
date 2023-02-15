const waterfall = document.querySelector("#waterfall")
// const pic = document.querySelector("li")
const pics = document.querySelectorAll("li")

console.log(pics.length)

const Waterfall = (options) => {
  // 参数
  let defaults = {
    width: 360,
    delay: 100,
    repeatShow: false
  }

  const config = defaults
  // 功能
  const show = (pic) => {
    if (window.scrollTop + window.height > pic.offsetTop) {
      pic.classList.add("show")
    } else {
      pic.classList.remove("show")
    }
  }

  const refresh = () => {
    let pics_col = parseInt(document.documentElement.clientWidth / config.width)

    if (pics.length < pics_col.length) {
      pics_col = pics.length
    }
  }
}