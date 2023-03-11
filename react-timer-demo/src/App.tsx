import { useEffect, useState, useRef } from 'react'
import { useCountDown } from './hooks'
import reactLogo from './assets/react.svg'
import './App.css'

const Login = () => {
  // 发送验证码
  // 设置初始值  定时器结束时候可以继续点击
  const { count, start } = useCountDown(10, () => setSendAble(true))
  // 默认刚开始可以点击
  const [sendAble, setSendAble] = useState(true)
  const onSendCode = () => {
    // 开启定时器
    start()
    // 关闭
    setSendAble(false)
  }

  return (
    <button className="code-extra" onClick={onSendCode}>
      {sendAble ? '发送验证码' : count + '秒之后发送'}
    </button>
  )
}

const Vaild = () => {
  const [cansend, setcansend] = useState(true)
  const [timer, settimer] = useState(3)
  const time = useRef(null)
  // 点击事件
  const send = () => {
    // 初始赋值给3
    settimer(3)
    // 1.禁用按钮
    setcansend(false)
    // 2.开启定时器
    time.current = setInterval(() => {
      settimer((timer) => timer - 1)
    }, 1000)
  }
  useEffect(() => {
    console.log('当前timer为', timer)
    // 如果时间为0
    if (timer === 0) {
      // 1.解除禁用
      setcansend(true)
      // 2.清除定时器
      clearInterval(time.current)
    }
  }, [timer])
  return (
    <div>
      <input type="text" name="" id="" />
      <button disabled={!cansend} onClick={send}>
        {cansend ? '发送验证码' : timer + '秒后重发'}
      </button>
    </div>
  )
}

function App() {
  const [count, setCount] = useState('10s')
  const [canclick, setCanclick] = useState(false)

  useEffect(() => {
    let num = 10

    // by setTimeout
    let timerId = setTimeout(function go() {
      if (parseInt(count) > 0) {
        setTimeout(go, 1000)
      }
      if (num === 0) {
        clearTimeout(timerId)
        num--
        setCanclick(true)
        setCount('抢购')
      } else if (num > 0) {
        setCount(num-- + 's')
      }
    }, 1000)

    // by setInterval
    // const timerId = setInterval(function () {
    //   if (num == 0) {
    //     clearInterval(timerId)
    //   }
    //   setCount(num-- + 's')
    // }, 1000)

    timerId
  }, [])

  const onSumbit = () => {
    setCount('已抢购')
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button disabled={!canclick} onClick={onSumbit}>
          {count}
        </button>
      </div>
      <div className="card">
        <Login />
      </div>
      <div className="card">
        <Vaild />
      </div>
    </div>
  )
}

export default App
