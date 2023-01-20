import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}{text === 'positive' ? '%' : ''}</td>
    </>
  )
}

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total <= 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <tr><StatisticLine text="good" value={good} /></tr>
        <tr><StatisticLine text="neutral" value={neutral} /></tr>
        <tr><StatisticLine text="bad" value={bad} /></tr>
        <tr><StatisticLine text="all" value={total} /></tr>
        <tr><StatisticLine text="average" value={average} /></tr>
        <tr><StatisticLine text="positive" value={positive} /></tr>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
    setGood(good + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
  }

  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGoodFeedback} />
      <Button text="neutral" onClick={handleNeutralFeedback} />
      <Button text="bad" onClick={handleBadFeedback} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </>
  )
}

export default App