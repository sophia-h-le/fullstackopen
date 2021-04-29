import React, { useState } from 'react'

const Statistic = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}

const Percentage = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <Statistic text='good' value={props.good} />
        <Statistic text='neutral' value={props.neutral} />
        <Statistic text='bad' value={props.bad} />
        <Statistic text='all' value={props.all} />
        <Statistic text='average' value={props.average} />
        <Percentage text='positive' value={props.positive} />
      </table>
    </>
  )
}

const Button = (props) => {
  return (
    <>
      <h1>give feedback</h1>
      <button onClick = {props.increaseGood}>
        {props.goodText}
      </button>
      <button onClick = {props.increaseNeutral}>
        {props.neutralText}
      </button>
      <button onClick = {props.increaseBad}>
        {props.badText}
      </button>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const increaseGood = () => {
    setAll(allClicks.concat('G'))
    setGood(good + 1)
  }
  const increaseNeutral = () => {
    setAll(allClicks.concat('N'))
    setNeutral(neutral + 1)
  }
  const increaseBad = () => {
    setAll(allClicks.concat('B'))
    setBad(bad + 1)
  }

  const all = good - bad
  const length = allClicks.length
  const average = all / length
  const positive = (good / length) * 100

  return (
    <div>
      <Button increaseGood={increaseGood} goodText='good'
              increaseNeutral={increaseNeutral} neutralText='neutral'
              increaseBad={increaseBad} badText='bad' />
      <Statistics allClicks={allClicks} good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}


export default App;
