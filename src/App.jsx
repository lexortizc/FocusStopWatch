import { useState, useRef, useEffect } from 'react';
import './App.css'

const initialState = {
  isStarted: false,
  time: 0,
}

function App() {
  const intervalRef = useRef(null)
  const limitRef = useRef(null)
  const [stopwatchState, setStopwatchState] = useState(initialState)

  useEffect(() => {
    if (limitRef.current?.value == stopwatchState.time) {
      onPause()
    }
  }, [stopwatchState.time])

  const onStart = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setStopwatchState( prev => ({
        isStarted: true,
        time: prev.time + 1
        }
      ))
    }, 1000);
  }

  const onPause = () => {
    clearInterval(intervalRef.current)
  }

  const onReset = () => {
    clearInterval(intervalRef.current)
    setStopwatchState(initialState)
  }

  const formatTime = ( seconds = 0 ) => {
    const date = new Date(null)
    date.setSeconds(seconds);

    return date.toISOString().substring(11, 19)
  }

  return (
    <>
      <h1>Stopwatch</h1>
      <h2>{ formatTime(stopwatchState?.time) }</h2>
      { (!!limitRef.current?.value &&  limitRef.current?.value == stopwatchState.time) && <h2>TIME!</h2> }
      <div>
        <button onClick={onStart}>
          Start
        </button>
        <button onClick={onPause}>
          Pause
        </button>
        <button onClick={onReset}>
          Reset
        </button>
        <input type='text' name='txtLimit' placeholder='Time Limit (seconds)' ref={ limitRef } />
      </div>
      <div>
      </div>
    </>
  );
}

export default App
