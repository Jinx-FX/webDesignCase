import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState('10s')

  useEffect(() => {
    let num = 10

    // by setTimeout
    // let timerId = setTimeout(function go() {
    //   if (parseInt(count) > 0) {
    //     setTimeout(go, 1000)
    //   }
    //   if (count == '已抢购') {
    //     console.log('111')
    //     num = -1
    //     clearTimeout(timeId)
    //   } else if (num === 0) {
    //     console.log('333')
    //     clearTimeout(timeId)
    //     num--
    //     setCount('抢购')
    //   } else if (num > 0) {
    //     setCount(num-- + 's')
    //     console.log('222')
    //   }
    // }, 1000)

    // by setInterval
    const timerId = setInterval(function () {
      if (num == 0) {
        clearInterval(timerId)
      }
      setCount(num-- + 's')
    }, 1000)

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
      <div className="card" onClick={onSumbit}>
        <button>{count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
