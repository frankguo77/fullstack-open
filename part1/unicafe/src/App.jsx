import { useState } from 'react'


function Button({handleClick, text}) {
  return (
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const StatisticsLine = ({text, val}) => {
  console.log(text)
  if (text == 'positive'){
  return (
    <>
      <p>{text} {val} %</p>
    </>
  )
  }
  return (
  <>
  <p>{text} {val}</p>
  </>
  )
}

const Statistics  = ({good,neutral,bad}) => {
  const all = good + neutral + bad
  const avg = (good - bad) / all
  const pos = (good / all) * 100
  return (
    <>
      <StatisticsLine text="good" val = {good}></StatisticsLine>
      <StatisticsLine text="neutral" val = {neutral}></StatisticsLine>
      <StatisticsLine text="bad" val = {bad}></StatisticsLine>
      <StatisticsLine text="all" val = {all}></StatisticsLine>
      <StatisticsLine text="average" val = {avg}></StatisticsLine>
      <StatisticsLine text="positive" val = {pos}></StatisticsLine>
    </>
  )
} 

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const inc = (val, setter) => () => {
    const newval = val + 1
    setter(newval)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={inc(good, setGood)} text = 'good' ></Button>
      <Button handleClick={inc(neutral, setNeutral)} text = 'neutral' ></Button>
      <Button handleClick={inc(bad, setBad)} text = 'bad' ></Button>
      <h1>statistics</h1>
      <Statistics good = {good} bad = {bad} neutral = {neutral} ></Statistics> 
        
    </div>
  )
}
export default App
